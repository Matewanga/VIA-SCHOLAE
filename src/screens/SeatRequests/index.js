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
import { db } from '../../config/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons'

export const SeatRequests = () => {
  const { user } = useUser()
  const [vagas, setVagas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const ref = collection(db, 'VagasSolicitadas')
        const q = query(ref, where('idMotorista', '==', user.uid))
        const snap = await getDocs(q)

        const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        setVagas(lista)
      } catch (err) {
        console.log('Erro ao carregar vagas:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleStatus = async (id, novoStatus) => {
    await updateDoc(doc(db, 'VagasSolicitadas', id), {
      status: novoStatus,
    })

    // Atualiza localmente
    setVagas((old) =>
      old.map((item) =>
        item.id === id ? { ...item, status: novoStatus } : item
      )
    )
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

      {/* --- SOLICITAÇÕES RECEBIDAS (pendentes) --- */}
      <Title mt={10} mb={1} ft={40} txtColor="text">
        Solicitações Recebidas
      </Title>

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

            {/* BOTÕES */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={() => handleStatus(item.id, 'recusado')}
                style={{
                  backgroundColor: '#ff4d4d',
                  padding: 10,
                  borderRadius: 50,
                }}
              >
                <Icon name="close" size={22} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleStatus(item.id, 'aceito')}
                style={{
                  backgroundColor: '#4CAF50',
                  padding: 10,
                  borderRadius: 50,
                }}
              >
                <Icon name="checkmark" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* --- VAGAS ACEITAS --- */}
      <Title mt={10} mb={1} ft={40} txtColor="text">
        Vagas Aceitas
      </Title>

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
          </View>
        )}
      />
    </View>
  )
}
