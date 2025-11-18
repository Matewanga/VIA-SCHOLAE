import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { Header, Button, CustomInput, CustomText } from '../../../components'
import { useRoute, useNavigation } from '@react-navigation/native'
import MapboxGL from '@rnmapbox/maps'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { useUser } from '../../../database'

import {
  fetchAddressFromCep,
  geocodeAddress,
  fetchRoute,
} from '../../Register/Routes/script'
import { updateRouteData, solicitarVaga } from './script'

export const EditRoute = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { user } = useUser()
  const { rota } = route.params

  const [startPoint, setStartPoint] = useState(rota.startPoint)
  const [cepStart, setCepStart] = useState(rota.cepStart)
  const [startCoord, setStartCoord] = useState(rota.startCoord)

  const [endPoint, setEndPoint] = useState(rota.endPoint)
  const [cepEnd, setCepEnd] = useState(rota.cepEnd)
  const [endCoord, setEndCoord] = useState(rota.endCoord)

  const [nameSchool, setNameSchool] = useState(rota.nameSchool)
  const [numberSchool, setNumberSchool] = useState(rota.numberSchool)
  const [region, setRegion] = useState(rota.region)

  const [routeCoords, setRouteCoords] = useState(rota.routeCoords)

  const convertCoords = () =>
    rota.routeCoords.coordinates.map((p) => [p.lng, p.lat])

  useEffect(() => {
    const updateStart = async () => {
      const addr = await fetchAddressFromCep(cepStart)
      if (addr) {
        setStartPoint(addr)
        const coords = await geocodeAddress(addr)
        setStartCoord(coords)
      }
    }
    if (cepStart.length === 8) updateStart()
  }, [cepStart])

  useEffect(() => {
    const updateEnd = async () => {
      const addr = await fetchAddressFromCep(cepEnd)
      if (addr) {
        setEndPoint(addr)
        const coords = await geocodeAddress(addr)
        setEndCoord(coords)
      }
    }
    if (cepEnd.length === 8) updateEnd()
  }, [cepEnd])

  useEffect(() => {
    const updateRoute = async () => {
      if (startCoord && endCoord) {
        const newRoute = await fetchRoute(startCoord, endCoord)
        setRouteCoords(newRoute)
      }
    }
    updateRoute()
  }, [startCoord, endCoord])

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'rotas', rota.id))
    alert('Rota excluída!')
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Header
          bgColor="blue"
          txtColor="white"
          size={40}
          iconName="chevron-back"
          color="white"
        >
          Editar Rota
        </Header>

        <MapboxGL.MapView
          style={{ height: 350, width: '100%' }}
          styleURL={MapboxGL.StyleURL.Street}
        >
          <MapboxGL.Camera zoomLevel={12} centerCoordinate={startCoord} />

          {startCoord && (
            <MapboxGL.PointAnnotation id="start" coordinate={startCoord} />
          )}
          {endCoord && (
            <MapboxGL.PointAnnotation id="end" coordinate={endCoord} />
          )}

          {routeCoords && (
            <MapboxGL.ShapeSource
              id="route"
              shape={{
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: convertCoords(),
                },
              }}
            >
              <MapboxGL.LineLayer
                id="routeLine"
                style={{ lineColor: 'blue', lineWidth: 4 }}
              />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>

        {user.type === 'motorista' && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <CustomText ft={26} fw="bold" mb={10}>
              Editar Dados:
            </CustomText>

            <CustomInput
              placeholder="Ponto Inicial"
              value={startPoint}
              onChangeText={setStartPoint}
            />

            <CustomInput
              placeholder="CEP Inicial"
              value={cepStart}
              onChangeText={setCepStart}
              maxLength={8}
              keyboardType="numeric"
            />

            <CustomInput
              placeholder="Ponto Final"
              value={endPoint}
              onChangeText={setEndPoint}
            />

            <CustomInput
              placeholder="CEP Final"
              value={cepEnd}
              onChangeText={setCepEnd}
              maxLength={8}
              keyboardType="numeric"
            />

            <CustomInput
              placeholder="Nome da Escola"
              value={nameSchool}
              onChangeText={setNameSchool}
            />
            <CustomInput
              placeholder="Número da Escola"
              value={numberSchool}
              onChangeText={setNumberSchool}
            />
            <CustomInput
              placeholder="Região"
              value={region}
              onChangeText={setRegion}
            />

            {/* BOTÃO SALVAR */}
            <Button
              title="Salvar Alterações"
              txtColor="text"
              pd={15}
              br={20}
              width="65%"
              onPress={() =>
                updateRouteData({
                  rotaId: rota.id,
                  startPoint,
                  cepStart,
                  endPoint,
                  cepEnd,
                  nameSchool,
                  numberSchool,
                  region,
                  startCoord,
                  endCoord,
                  routeCoords,
                  navigation,
                })
              }
            />

            <Button
              title="Excluir Rota"
              txtColor="text"
              pd={15}
              br={20}
              width="65%"
              onPress={handleDelete}
            />
          </View>
        )}
        {user.type === 'responsavel' && (
          <Button
            title="Solicitar Vaga"
            txtColor="text"
            pd={15}
            br={20}
            width="65%"
            onPress={async () => {
              try {
                await solicitarVaga({
                  idResponsavel: user.uid,
                  nomeResponsavel: user.username,
                  fotoResponsavel: user.profileImageUrl,
                  idMotorista: rota.motoristaId,
                  idRota: rota.id,
                  nomeEscola: rota.nameSchool,
                  data: new Date(),
                })

                alert('Solicitação enviada com sucesso!')
              } catch (err) {
                console.log('Erro ao solicitar vaga:', err)
              }
            }}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
