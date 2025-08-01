import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native'
import { Container, Form } from './styles'
import { Header, Button, CustomInput, Title } from '../../../components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useUser } from '../../../database'
import MapboxGL from '@rnmapbox/maps';

import { fetchAddressFromCep, geocodeAddress, fetchRoute, handleRegisterRoute } from './script'

export const RegisterRoute = () => {
    const route = useRoute()
    const { motoristaId } = route.params || {}
    const [startPoint, setStartPoint] = useState('')
    const [cepStart, setCepStart] = useState('')
    const [endPoint, setEndPoint] = useState('')
    const [cepEnd, setCepEnd] = useState('')
    const [startCoord, setStartCoord] = useState(null)
    const [endCoord, setEndCoord] = useState(null)
    const [routeCoords, setRouteCoords] = useState(null)

    const [nameSchool, setNameSchool] = useState('')
    const [numberSchool, setNumberSchool] = useState('')
    const [region, setRegion] = useState('')
    const navigation = useNavigation()
    const { user } = useUser()

    const mapInteractable = !!startCoord && !!endCoord

    useEffect(() => {
        const updateStart = async () => {
            const address = await fetchAddressFromCep(cepStart)
            if (address) {
                setStartPoint(address)
                const coords = await geocodeAddress(address)
                setStartCoord(coords)
            }
        }
        if (cepStart.length === 8) updateStart()
    }, [cepStart])

    useEffect(() => {
        const updateEnd = async () => {
            const address = await fetchAddressFromCep(cepEnd)
            if (address) {
                setEndPoint(address)
                const coords = await geocodeAddress(address)
                setEndCoord(coords)
            }
        }
        if (cepEnd.length === 8) updateEnd()
    }, [cepEnd])

    useEffect(() => {
        const updateRoute = async () => {
            if (startCoord && endCoord) {
                const route = await fetchRoute(startCoord, endCoord)
                setRouteCoords(route)
            }
        }
        updateRoute()
    }, [startCoord, endCoord])

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <Container contentContainerStyle={{ paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
                <Header bgColor="blue" txtColor="white" size={40} color="white">CADASTRO ROTA</Header>

                <MapboxGL.MapView
                    style={{ height: 350, width: '100%', marginTop: 10 }}
                    styleURL={MapboxGL.StyleURL.Street}
                    zoomEnabled={mapInteractable}
                    scrollEnabled={mapInteractable}
                    rotateEnabled={mapInteractable}
                    pitchEnabled={mapInteractable}
                >
                    <MapboxGL.Camera
                        zoomLevel={startCoord ? 12 : 2.5}
                        centerCoordinate={startCoord || [-52, -13]}
                    />

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
                                geometry: routeCoords,
                            }}
                        >
                            <MapboxGL.LineLayer
                                id="routeLine"
                                style={{
                                    lineColor: 'blue',
                                    lineWidth: 4,
                                }}
                            />
                        </MapboxGL.ShapeSource>
                    )}
                </MapboxGL.MapView>

                <Title ft={35} mt={25} mb={1}>Cadastre sua Rota:</Title>
                <Form>
                    <CustomInput
                        placeholder="Ponto Inicial"
                        value={startPoint}
                        onChangeText={setStartPoint}
                    />
                    <CustomInput
                        placeholder="CEP Ponto Inicial"
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
                        placeholder="CEP Ponto Final"
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
                        placeholder="Área de Operação"
                        value={region}
                        onChangeText={setRegion}
                    />
                </Form>
                <Button
                    title="Cadastrar"
                    txtColor="text"
                    pd={15}
                    br={20}
                    width="65%"
                    height={45}
                    ft={16}
                    fw="bold"
                    onPress={() => handleRegisterRoute({
                        motoristaId,
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
                        user,
                        navigation
                    })}
                />
            </Container>
        </KeyboardAvoidingView>
    )
}
