import React, { useEffect, useState } from 'react'
import {
  Container,
  HeaderContainer,
  ApiContainer,
  TimeText,
  Chegada,
} from './styles'
import MapboxGL from '@rnmapbox/maps'
import { Text } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtMmM4ejl3NDBxbW4ycm9uN3JlamtqbncifQ.hpltrhlR36OOJoDENW2YyQ'
)

export const Home = () => {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [route, setRoute] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [eta, setEta] = useState('00:00')
  const [userType, setUserType] = useState('')
  const [isForward, setIsForward] = useState(true)

  const origin = {
    latitude: -23.512229,
    longitude: -46.523497,
  }
  const destination = {
    latitude: -23.529222,
    longitude: -46.484998,
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user_data')
        if (userData) {
          const parsedUser = JSON.parse(userData)
          setUserType(parsedUser.type)
        }
      } catch (error) {
        console.log('Erro ao recuperar dados do usuário:', error)
      }
    }
    getUserData()
  }, [])

  useEffect(() => {
    const getRoute = async () => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=sk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtMmM4ejl3NDBxbW4ycm9uN3JlamtqbncifQ.hpltrhlR36OOJoDENW2YyQ`

      try {
        const response = await axios.get(url)
        const data = response.data

        if (data.routes && data.routes.length > 0) {
          const routeData = data.routes[0]
          setRoute(routeData.geometry.coordinates)
          setEta(convertSecondsToTime(routeData.duration))
        }
      } catch (error) {
        console.error('Erro ao buscar rota: ', error)
      }
    }

    getRoute()
  }, [])

  useEffect(() => {
    if (route) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          let newStep = prev

          if (isForward) {
            if (newStep < route.length - 1) {
              newStep += 1
            } else {
              setIsForward(false)
              newStep = route.length - 1
            }
          } else {
            if (newStep > 0) {
              newStep -= 1
            } else {
              setIsForward(true)
              newStep = 0
            }
          }

          setLocation({
            latitude: route[newStep][1],
            longitude: route[newStep][0],
          })
          return newStep
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [route, isForward])

  const convertSecondsToTime = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60)
    const seconds = Math.floor(durationInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  if (errorMsg) {
    return <Text>{errorMsg}</Text>
  }

  if (!location) {
    return <Text>Obtendo localização...</Text>
  }

  return (
    <Container>
      <HeaderContainer>
        <MapboxGL.MapView
          style={{ flex: 1 }}
          styleURL={MapboxGL.StyleURL.Street}
        >
          <MapboxGL.Camera
            centerCoordinate={[location.longitude, location.latitude]}
            zoomLevel={15.5}
            pitch={userType === 'motorista' ? 55 : 0}
            heading={0}
            animationDuration={3000}
          />

          {route && (
            <MapboxGL.ShapeSource
              id="routeSource"
              shape={{
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: route,
                },
              }}
            >
              <MapboxGL.LineLayer
                id="routeLayer"
                style={{
                  lineWidth: 3,
                  lineJoin: 'round',
                  lineCap: 'round',
                  lineColor: '#333333',
                }}
              />
            </MapboxGL.ShapeSource>
          )}

          {location && (
            <>
              <MapboxGL.ShapeSource
                id="vanCircleSource"
                shape={{
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [location.longitude, location.latitude],
                  },
                }}
              >
                <MapboxGL.CircleLayer
                  id="vanCircleLayer"
                  style={{
                    circleRadius: 12,
                    circleColor: '#E1B415',
                    circleOpacity: 0.7,
                  }}
                />
              </MapboxGL.ShapeSource>

              {/* A van (ícone) */}
              <MapboxGL.PointAnnotation
                id="van"
                coordinate={[location.longitude, location.latitude]}
              >
                <Text>🚐</Text>
              </MapboxGL.PointAnnotation>
            </>
          )}

          {userType === 'motorista' && (
            <MapboxGL.VectorSource>
              <MapboxGL.FillExtrusionLayer
                id="3d-buildings"
                sourceLayer="building"
                style={{
                  fillExtrusionColor: '#aaa',
                  fillExtrusionHeight: ['get', 'height'],
                  fillExtrusionBase: ['get', 'min_height'],
                  fillExtrusionOpacity: 1,
                }}
              />
            </MapboxGL.VectorSource>
          )}
        </MapboxGL.MapView>
      </HeaderContainer>

      <ApiContainer>
        <Chegada>Chegada</Chegada>
        <TimeText>{eta}</TimeText>
      </ApiContainer>
    </Container>
  )
}
