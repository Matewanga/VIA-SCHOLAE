import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'
import MapboxGL from '@rnmapbox/maps'
import { useRoute, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { db } from '../../../../config/firebase'
import { Container, HeaderContainer, Header } from './styles'
import { Return, ButtonSolicitarVagas } from '../../../../components'
import { useUser } from '../../../../database'

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtMmM4ejl3NDBxbW4ycm9uN3JlamtqbncifQ.hpltrhlR36OOJoDENW2YyQ'
)

export const RotaMap = () => {
  const route = useRoute()
  const {
    routeId,
    cepStart,
    cepEnd,
    nomeEscola,
    numeroEscola,
    motoristaId,
    responsavelId,
  } = route.params

  console.log(
    'id do motorista',
    motoristaId,
    'id do responsavel:',
    responsavelId,
    'id da rota:',
    routeId
  )

  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [startCoords, setStartCoords] = useState(null)
  const [endCoords, setEndCoords] = useState(null)
  const db = useDatabase()
  const navigation = useNavigation()
  const { user } = useUser()

  const solicitarVaga = async () => {
    if (!db) return

    try {
      if (!responsavelId) {
        Alert.alert('Erro', 'Responsável não encontrado.')
        return
      }

      // Dados sendo enviados para a tabela Vagas
      const vagaData = {
        responsavelId,
        motoristaId,
        status: 'pendente',
        data_solicitacao: new Date().toISOString(),
        detalhes_rota: `${cepStart} - ${cepEnd}`,
        routeId,
      }

      // Query de inserção
      const query = `
        INSERT INTO Vagas (responsavelId, motoristaId, status, data_solicitacao, detalhes_rota, routeId)
        VALUES (?, ?, 'pendente', ?, ?, ?);
      `
      const values = [
        vagaData.responsavelId,
        vagaData.motoristaId,
        vagaData.data_solicitacao,
        vagaData.detalhes_rota,
        vagaData.routeId,
      ]

      // Executando a inserção
      console.log('Dados sendo enviados para a tabela Vagas:', vagaData)
      console.log('Vaga inserida com motoristaId:', motoristaId)
      await db.execAsync(query, values)

      Alert.alert('Solicitação', 'Vaga solicitada com sucesso!')
    } catch (error) {
      console.error('Erro ao solicitar vaga:', error)
      Alert.alert('Erro', 'Não foi possível solicitar a vaga.')
    }
  }

  const fetchCoordinatesFromCEP = async (
    cep,
    schoolName = null,
    number = null
  ) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

      if (response.data && !response.data.erro) {
        const address = response.data.logradouro
        const city = response.data.localidade

        // Monta o endereço completo com nome e número da escola (se fornecidos)
        const fullAddress = `${address}${number ? `, ${number}` : ''}${schoolName ? `, ${schoolName}` : ''}`

        // Obtém coordenadas a partir do endereço completo e da cidade
        const { latitude, longitude } = await getCoordinatesFromAddress(
          fullAddress,
          city
        )
        return { longitude, latitude }
      } else {
        console.error(`Nenhum dado encontrado para o CEP ${cep}.`)
        return null
      }
    } catch (error) {
      console.error(`Erro ao buscar dados para o CEP ${cep}:`, error)
      return null
    }
  }

  // Função auxiliar para buscar coordenadas com base em endereço e cidade usando o Mapbox
  const getCoordinatesFromAddress = async (address, city) => {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}, ${city}.json`,
      {
        params: {
          access_token:
            'sk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtMmM4ejl3NDBxbW4ycm9uN3JlamtqbncifQ.hpltrhlR36OOJoDENW2YyQ',
        },
      }
    )
    const coordinates = response.data.features[0].geometry.coordinates
    return { latitude: coordinates[1], longitude: coordinates[0] }
  }

  // Função para buscar a rota do banco de dados e converter os CEPs em coordenadas
  const fetchRoute = async () => {
    if (!db) return

    try {
      // Busca rota específica pelo ID no banco de dados
      const result = await db.getAllAsync('SELECT * FROM Rota WHERE id = ?', [
        routeId,
      ])

      if (result && result.length > 0) {
        const { cep_start, cep_end } = result[0]

        // Busca as coordenadas dos CEPs de início e fim
        const startCoords = await fetchCoordinatesFromCEP(cep_start)
        const endCoords = await fetchCoordinatesFromCEP(
          cep_end,
          nomeEscola,
          numeroEscola
        )

        if (startCoords && endCoords) {
          // Atualiza os estados com as coordenadas obtidas
          setStartCoords([startCoords.longitude, startCoords.latitude])
          setEndCoords([endCoords.longitude, endCoords.latitude])

          // Busca rota entre os pontos usando a API do Mapbox
          const response = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.longitude},${startCoords.latitude};${endCoords.longitude},${endCoords.latitude}`,
            {
              params: {
                geometries: 'geojson',
                access_token:
                  'sk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtMmM4ejl3NDBxbW4ycm9uN3JlamtqbncifQ.hpltrhlR36OOJoDENW2YyQ',
              },
            }
          )

          // Verifica e armazena as coordenadas da rota no estado
          if (response.data.routes.length > 0) {
            const coordinates = response.data.routes[0].geometry.coordinates
            setRouteCoordinates(coordinates)
          } else {
            console.error('Nenhuma rota encontrada.')
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar rota:', error)
      Alert.alert('Erro', 'Erro ao buscar rota.')
    }
  }

  useEffect(() => {
    fetchRoute()
  }, [db])

  return (
    <Container>
      <Header>
        <TouchableOpacity style={styles.return}>
          <Return onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      </Header>
      <HeaderContainer>
        <MapboxGL.MapView
          style={{ flex: 1 }}
          styleURL={MapboxGL.StyleURL.Street}
        >
          {startCoords && (
            <MapboxGL.Camera
              centerCoordinate={startCoords}
              zoomLevel={14}
              minZoomLevel={12}
              maxZoomLevel={16}
            />
          )}
          {startCoords && (
            <MapboxGL.PointAnnotation
              coordinate={startCoords}
              id="startpoint"
            />
          )}
          {endCoords && (
            <MapboxGL.PointAnnotation coordinate={endCoords} id="endpoint" />
          )}
          {routeCoordinates.length > 0 && (
            <MapboxGL.ShapeSource
              id="routeSource"
              shape={{
                type: 'Feature',
                geometry: { type: 'LineString', coordinates: routeCoordinates },
              }}
            >
              <MapboxGL.LineLayer id="routeLine" style={styles.routeLine} />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>
      </HeaderContainer>
      {user && user.type === 'responsavel' && (
        <ButtonSolicitarVagas onPress={solicitarVaga}>
          Solicitar Vaga
        </ButtonSolicitarVagas>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  return: {
    top: 40,
    left: 5,
  },
  marker: {
    height: 15,
    width: 15,
    backgroundColor: '#262626',
    borderRadius: 10,
  },
  routeLine: {
    lineWidth: 5,
    lineJoin: 'round',
    lineCap: 'round',
    lineColor: '#262626',
  },
})
