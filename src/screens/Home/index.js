// Home.js - Código completo com identificação de tipo
import React, { useEffect, useState } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { Header, CustomText, Button } from '../../components'
import { Container } from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { useUser } from '../../database'
import {
  buscarRotasDoMotorista,
  gerarRotaCompleta,
  calcularCentroMapa,
  buscarTodasRotasFinaisDoMotorista,
  buscarRotasDoResponsavel,
} from './script'

import { BubbleFinalRoutes } from './bubble'
import { DriverInfo } from './driverInfo'
import { MapSection } from './map'
import { Timeline } from './timeLine'

export const Home = () => {
  const { user } = useUser()

  const [rotas, setRotas] = useState([])
  const [rotaAtual, setRotaAtual] = useState(null)
  const [rotaGeojson, setRotaGeojson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rotaIniciada, setRotaIniciada] = useState(false)
  const [mostrarBubble, setMostrarBubble] = useState(false)
  const [rotasFinais, setRotasFinais] = useState([])
  const [distancia, setDistancia] = useState(null)
  const [duracao, setDuracao] = useState(null)

  // Identifica o tipo de usuário baseado no campo 'tipo'
  const isMotorista = user?.tipo === 'motorista'
  const isResponsavel = user?.tipo === 'responsavel'

  console.log(
    'Tipo de usuário:',
    user?.tipo,
    'isMotorista:',
    isMotorista,
    'isResponsavel:',
    isResponsavel
  )

  useEffect(() => {
    if (!user?.uid) return

    const load = async () => {
      try {
        if (isMotorista) {
          // Motorista: busca suas rotas
          console.log('Buscando rotas para motorista:', user.uid)
          const r = await buscarRotasDoMotorista(user.uid)
          console.log('Rotas encontradas para motorista:', r.length)
          setRotas(r)
        } else if (isResponsavel) {
          // Responsável: busca rotas onde ele está incluído
          console.log('Buscando rotas para responsável:', user.uid)
          const r = await buscarRotasDoResponsavel(user.uid)
          console.log('Rotas encontradas para responsável:', r.length)
          setRotas(r)

          // Se o responsável tem uma rota, já define como atual
          if (r.length > 0) {
            console.log('Definindo rota atual para responsável:', r[0].id)
            setRotaAtual(r[0])
            setRotaIniciada(true) // Responsável vê rota como "iniciada" sempre
          }
        } else {
          console.log('Tipo de usuário desconhecido:', user?.tipo)
        }
      } catch (error) {
        console.error('Erro ao carregar rotas:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user?.uid, isMotorista, isResponsavel])

  // Resto dos useEffect permanecem iguais...
  useEffect(() => {
    const montar = async () => {
      if (!rotaAtual?.rotaOrdenada?.pontos) {
        setRotaGeojson(null)
        return
      }
      const geo = await gerarRotaCompleta(rotaAtual.rotaOrdenada.pontos)
      setRotaGeojson(geo)
    }
    montar()
  }, [rotaAtual])

  useEffect(() => {
    const calc = async () => {
      if (!rotaAtual?.rotaOrdenada?.pontos) {
        setDistancia(null)
        setDuracao(null)
        return
      }

      const coords = rotaAtual.rotaOrdenada.pontos
        .map((p) => `${p.coordinate[0]},${p.coordinate[1]}`)
        .join(';')

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&overview=full&access_token=pk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtZHMxYTdmNDBveHAyaXBwNmk0cGRtbDUifQ.mzr4-ccJpyUD5cH08FtGbQ`

      try {
        const res = await fetch(url)
        const json = await res.json()

        if (json.routes && json.routes[0]) {
          setDistancia(json.routes[0].distance)
          setDuracao(json.routes[0].duration)
        }
      } catch (error) {
        console.error('Erro ao calcular rota:', error)
      }
    }

    calc()
  }, [rotaAtual])

  // Funções específicas para motorista
  const handleInicioClick = async () => {
    if (!isMotorista) return // Só motorista pode clicar

    try {
      console.log('Motorista clicou em Início, buscando rotas finais...')
      const todasRotasFinais = await buscarTodasRotasFinaisDoMotorista(user.uid)
      console.log('Rotas finais encontradas:', todasRotasFinais?.length || 0)
      setRotasFinais(todasRotasFinais || [])
      setMostrarBubble(true)
    } catch (error) {
      console.error('ERRO ao buscar rotas finais:', error)
    }
  }

  const handleFinalizarClick = () => {
    if (!isMotorista) return // Só motorista pode finalizar

    console.log('Motorista finalizando rota...')
    setRotaIniciada(false)
    setRotaAtual(null)
    setRotaGeojson(null)
    setDistancia(null)
    setDuracao(null)
  }

  const handleSelecionarRota = (rotaSelecionada) => {
    if (!isMotorista) return // Só motorista pode selecionar

    console.log('Motorista selecionou rota:', rotaSelecionada.id)
    setRotaAtual(rotaSelecionada)
    setMostrarBubble(false)
    setRotaIniciada(true)
  }

  if (loading) {
    return (
      <Container>
        <Header txtColor="white" bgColor="blue" size={40} color="white">
          Rota
        </Header>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size={50} color="blue" />
          <CustomText ft={20} mt={20}>
            Carregando...
          </CustomText>
        </View>
      </Container>
    )
  }

  // ========== RESPONSÁVEL SEM ROTA ==========
  if (isResponsavel && rotas.length === 0) {
    return (
      <Container>
        <Header txtColor="white" bgColor="blue" size={40} color="white">
          Sua Rota
        </Header>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Icon name="time-outline" size={80} color="#ccc" />
          <CustomText
            ft={22}
            color="#666"
            mt={20}
            style={{ textAlign: 'center' }}
          >
            Aguarde até que uma rota seja iniciada
          </CustomText>
          <CustomText
            ft={16}
            color="#888"
            mt={10}
            style={{ textAlign: 'center' }}
          >
            O motorista ainda não iniciou sua rota
          </CustomText>
        </View>
      </Container>
    )
  }

  // ========== MOTORISTA SEM ROTAS DISPONÍVEIS ==========
  if (isMotorista && rotas.length === 0) {
    return (
      <Container>
        <Header txtColor="white" bgColor="blue" size={40} color="white">
          Rota
        </Header>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Icon name="map-outline" size={80} color="#ccc" />
          <CustomText
            ft={22}
            color="#666"
            mt={20}
            style={{ textAlign: 'center' }}
          >
            Nenhuma rota disponível
          </CustomText>
          <CustomText
            ft={16}
            color="#888"
            mt={10}
            style={{ textAlign: 'center' }}
          >
            Aceite solicitações de vaga para criar rotas
          </CustomText>
        </View>
      </Container>
    )
  }

  // ========== MOTORISTA COM ROTAS MAS SEM SELECIONAR ==========
  if (isMotorista && !rotaAtual) {
    return (
      <Container>
        <Header txtColor="white" bgColor="blue" size={40} color="white">
          Rota
        </Header>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Icon name="map-outline" size={80} color="#ccc" />
          <CustomText
            ft={22}
            color="#666"
            mt={20}
            style={{ textAlign: 'center' }}
          >
            Selecione uma rota
          </CustomText>
          <CustomText
            ft={16}
            color="#888"
            mt={10}
            style={{ textAlign: 'center' }}
          >
            Clique em "Início" para escolher sua rota
          </CustomText>

          <View style={{ marginTop: 30, width: '80%' }}>
            <Button
              title="Início"
              txtColor="white"
              pd={15}
              br={20}
              width="100%"
              height={50}
              ft={18}
              fw="bold"
              bgColor="#34A853"
              onPress={handleInicioClick}
            />
          </View>
        </View>

        <BubbleFinalRoutes
          mostrarBubble={mostrarBubble}
          setMostrarBubble={setMostrarBubble}
          onSelecionarRota={handleSelecionarRota}
          rotasFinais={rotasFinais}
        />
      </Container>
    )
  }

  // ========== TELA COM ROTA (AMBOS OS TIPOS) ==========
  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Header txtColor="white" bgColor="blue" size={40} color="white">
          {isMotorista ? 'Minha Rota' : 'Sua Rota'}
        </Header>

        <MapSection
          rotaGeojson={rotaGeojson}
          rotaAtual={rotaAtual}
          rotaIniciada={rotaIniciada}
          isMotorista={isMotorista}
        />

        {/* BOTÃO SÓ PARA MOTORISTA */}
        {isMotorista && (
          <View style={{ alignItems: 'center', paddingVertical: 15 }}>
            <Button
              title={rotaIniciada ? 'Finalizar' : 'Início'}
              txtColor="white"
              pd={15}
              br={20}
              width="50%"
              height={50}
              ft={18}
              fw="bold"
              bgColor={rotaIniciada ? '#EA4335' : '#34A853'}
              onPress={rotaIniciada ? handleFinalizarClick : handleInicioClick}
            />
          </View>
        )}

        {/* TIMELINE PARA AMBOS */}
        {distancia && duracao && (
          <Timeline distancia={distancia} duracao={duracao} />
        )}

        {/* DRIVER INFO PARA AMBOS */}
        <DriverInfo
          user={user}
          rotaAtual={rotaAtual}
          isMotorista={isMotorista}
        />

        {/* BUBBLE SÓ PARA MOTORISTA */}
        {isMotorista && (
          <BubbleFinalRoutes
            mostrarBubble={mostrarBubble}
            setMostrarBubble={setMostrarBubble}
            onSelecionarRota={handleSelecionarRota}
            rotasFinais={rotasFinais}
          />
        )}
      </ScrollView>
    </Container>
  )
}
