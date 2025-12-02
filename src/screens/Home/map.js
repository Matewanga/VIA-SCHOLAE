// map.js
import React from 'react'
import { View } from 'react-native'
import MapboxGL from '@rnmapbox/maps'
import Icon from 'react-native-vector-icons/Ionicons'
import { calcularCentroMapa } from './script'
import { CustomText } from '../../components'
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtZHMxYTdmNDBveHAyaXBwNmk0cGRtbDUifQ.mzr4-ccJpyUD5cH08FtGbQ'
)

export function MapSection({ rotaGeojson, rotaAtual, rotaIniciada, isMotorista = true }) {
  const mostrarComoIniciada = isMotorista ? rotaIniciada : true
  const rotaSelecionada = rotaAtual?.rotaOrdenada?.pontos?.length > 0
  const cameraConfig = calcularCentroMapa(rotaAtual)

  if (!rotaAtual) {
    return (
      <View style={{ height: 350, width: '100%', position: 'relative' }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            borderRadius: 10,
          }}
        >
          <Icon name="map-outline" size={60} color="white" />
          <CustomText
            ft={20}
            fw="bold"
            color="white"
            mt={15}
            style={{ textAlign: 'center' }}
          >
            Selecione uma rota
          </CustomText>
          <CustomText
            ft={16}
            color="#ccc"
            mt={5}
            style={{ textAlign: 'center', paddingHorizontal: 40 }}
          >
            Clique em "Início" para escolher sua rota
          </CustomText>
        </View>

        <MapboxGL.MapView
          style={{ flex: 1, opacity: 0.3 }}
          styleURL="mapbox://styles/mapbox/streets-v11"
        >
          <MapboxGL.Camera
            centerCoordinate={[-46.6333, -23.5505]}
            zoomLevel={11}
          />
        </MapboxGL.MapView>
      </View>
    )
  }

  return (
    <View style={{ height: 350, width: '100%', position: 'relative' }}>
      {/* Overlay escuro quando não tem rota (só para motorista) */}
      {isMotorista && !rotaSelecionada && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            borderRadius: 10,
          }}
        >
          <Icon name="map-outline" size={60} color="white" />
          <CustomText
            ft={20}
            fw="bold"
            color="white"
            mt={15}
            style={{ textAlign: 'center' }}
          >
            Selecione uma rota
          </CustomText>
          <CustomText
            ft={16}
            color="#ccc"
            mt={5}
            style={{ textAlign: 'center', paddingHorizontal: 40 }}
          >
            Clique em "Início" para escolher sua rota
          </CustomText>
        </View>
      )}

      {/* Para responsável sem rota */}
      {!isMotorista && !rotaSelecionada && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            borderRadius: 10,
          }}
        >
          <Icon name="time-outline" size={60} color="white" />
          <CustomText
            ft={20}
            fw="bold"
            color="white"
            mt={15}
            style={{ textAlign: 'center' }}
          >
            Aguarde o motorista
          </CustomText>
          <CustomText
            ft={16}
            color="#ccc"
            mt={5}
            style={{ textAlign: 'center', paddingHorizontal: 40 }}
          >
            Sua rota será exibida aqui quando o motorista iniciar
          </CustomText>
        </View>
      )}

      {/* Mapa */}
      <MapboxGL.MapView
        style={{
          flex: 1,
          opacity: rotaSelecionada ? 1 : 0.3,
        }}
        styleURL="mapbox://styles/mapbox/streets-v11"
      >
        <MapboxGL.Camera
          centerCoordinate={cameraConfig.center}
          zoomLevel={cameraConfig.zoom}
        />

        {rotaGeojson && rotaSelecionada && (
          <MapboxGL.ShapeSource id="rota" shape={rotaGeojson}>
            <MapboxGL.LineLayer
              id="linha"
              style={{
                lineColor: isMotorista ? '#4285F4' : '#34A853',
                lineWidth: 4,
                lineOpacity: 0.8,
              }}
            />
          </MapboxGL.ShapeSource>
        )}

        {rotaSelecionada &&
          rotaAtual?.rotaOrdenada?.pontos.map((p, i) => (
            <MapboxGL.PointAnnotation
              key={i}
              id={`p-${i}`}
              coordinate={p.coordinate}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor:
                    p.type === 'origem'
                      ? '#34A853'
                      : p.type === 'responsavel'
                        ? isMotorista
                          ? '#FBBC05'
                          : '#4285F4' // Responsável vê seu ponto como azul
                        : '#EA4335',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4,
                }}
              >
                <Icon
                  name={
                    p.type === 'origem'
                      ? 'car'
                      : p.type === 'responsavel'
                        ? 'person'
                        : 'school'
                  }
                  size={12}
                  color="white"
                />
              </View>
            </MapboxGL.PointAnnotation>
          ))}
      </MapboxGL.MapView>

      {/* Badge de status */}
      {rotaSelecionada && mostrarComoIniciada && (
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: isMotorista ? '#34A853' : '#4285F4',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 5,
          }}
        >
          <Icon
            name={isMotorista ? 'checkmark-circle' : 'car'}
            size={16}
            color="white"
          />
          <CustomText ft={12} color="white" fw="bold" ml={5}>
            {isMotorista ? 'ROTA ATIVA' : 'MOTORISTA A CAMINHO'}
          </CustomText>
        </View>
      )}
    </View>
  )
}
