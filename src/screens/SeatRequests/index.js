import React, { useEffect, useState } from 'react'
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native'
import { CustomText, Header, Title } from '../../components'
import { useUser } from '../../database'
import Icon from 'react-native-vector-icons/Ionicons'
import { carregarVagas, handleStatusAction } from './script'

export const SeatRequests = () => {
  const { user } = useUser()
  const [vagas, setVagas] = useState([])
  const [loading, setLoading] = useState(true)
  const [processando, setProcessando] = useState({})

  useEffect(() => {
    carregarVagas(user, setVagas, setLoading)
  }, [])

  const handleStatus = (idVaga, novoStatus) => {
    handleStatusAction({
      idVaga,
      novoStatus,
      vagas,
      setVagas,
      setProcessando,
      user,
    })
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={40} color="blue" />
        <CustomText ft={20}>Carregando solicitações...</CustomText>
      </View>
    )
  }

  if (vagas.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CustomText ft={22}>Nenhuma solicitação encontrada</CustomText>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header bgColor="blue" txtColor="white" size={40} color="white">
        Solicitações de Vaga
      </Header>

      <Title mt={10} mb={1} ft={40} txtColor="text">
        Solicitações Recebidas
      </Title>

      {/* LISTA DE VAGAS PENDENTES */}
      <FlatList
        data={vagas.filter((v) => v.status === 'pendente')}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <CustomText ft={18} color="#666">
            Nenhuma solicitação pendente
          </CustomText>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 15,
              marginBottom: 20,
              elevation: 4,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
            }}
          >
            <Image
              source={{ uri: item.fotoResponsavel }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#ddd',
              }}
            />

            <View style={{ flex: 1 }}>
              <CustomText ft={28} color="text">
                {item.nomeResponsavel}
              </CustomText>

              <CustomText ft={20} fw="bold" mt={-10}>
                {item.nomeEscola}
              </CustomText>

              <CustomText ft={18} color="#777" mt={-15}>
                Status: {item.status}
              </CustomText>
            </View>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              {/* BOTÃO RECUSAR */}
              <TouchableOpacity
                onPress={() => handleStatus(item.id, 'recusado')}
                disabled={processando[item.id]}
                style={{
                  backgroundColor: processando[item.id] ? '#ccc' : '#ff4d4d',
                  padding: 10,
                  borderRadius: 50,
                  opacity: processando[item.id] ? 0.6 : 1,
                }}
              >
                {processando[item.id] ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Icon name="close" size={22} color="white" />
                )}
              </TouchableOpacity>

              {/* BOTÃO ACEITAR */}
              <TouchableOpacity
                onPress={() => handleStatus(item.id, 'aceito')}
                disabled={processando[item.id]}
                style={{
                  backgroundColor: processando[item.id] ? '#ccc' : '#4CAF50',
                  padding: 10,
                  borderRadius: 50,
                  opacity: processando[item.id] ? 0.6 : 1,
                }}
              >
                {processando[item.id] ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Icon name="checkmark" size={22} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Title mt={10} mb={1} ft={40} txtColor="text">
        Vagas Aceitas
      </Title>

      {/* LISTA DE VAGAS ACEITAS */}
      <FlatList
        data={vagas.filter((v) => v.status === 'aceito')}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <CustomText ft={18} color="#666">
            Nenhuma vaga aceita ainda
          </CustomText>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 15,
              marginBottom: 20,
              elevation: 4,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              borderLeftWidth: item.rotaFinalCriada ? 5 : 0,
              borderLeftColor: item.rotaFinalCriada ? '#4CAF50' : 'transparent',
            }}
          >
            <Image
              source={{ uri: item.fotoResponsavel }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#ddd',
              }}
            />

            <View style={{ flex: 1 }}>
              <CustomText ft={28} color="text">
                {item.nomeResponsavel}
              </CustomText>

              <CustomText ft={20} fw="bold" mt={-10}>
                {item.nomeEscola}
              </CustomText>

              <CustomText ft={18} color="#777" mt={-15}>
                Status: {item.status}
              </CustomText>

              {item.rotaFinalCriada && (
                <CustomText ft={14} color="#4CAF50" mt={5}>
                  Rota final criada
                </CustomText>
              )}
            </View>
          </View>
        )}
      />
    </View>
  )
}
