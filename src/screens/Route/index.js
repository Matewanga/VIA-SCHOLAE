import React, { useEffect, useState } from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native'
import { Header, CustomText } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useUser } from '../../database'

export const ManageRoute = ({ route }) => {
  const navigation = useNavigation()
  const { user } = useUser()

  // pegar motoristaId da rota, ou usar o id do usuário logado
  const motoristaId = route?.params?.motoristaId || user?.uid
  const motoristaName = route?.params?.motoristaName
  const isOwnProfile =
    !route?.params?.motoristaId || route.params.motoristaId === user.uid

  const [rotas, setRotas] = useState([])
  const [loading, setLoading] = useState(true)

  const MAPBOX_TOKEN =
    'pk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtZHMxYTdmNDBveHAyaXBwNmk0cGRtbDUifQ.mzr4-ccJpyUD5cH08FtGbQ'

  useEffect(() => {
    if (!motoristaId) return

    const loadRoutes = async () => {
      try {
        const ref = collection(db, 'rotas')
        const q = query(ref, where('motoristaId', '==', motoristaId))
        const snap = await getDocs(q)

        const lista = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setRotas(lista)
      } catch (err) {
        console.log('Erro ao carregar rotas:', err)
      } finally {
        setLoading(false)
      }
    }

    loadRoutes()
  }, [motoristaId])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={40} color="blue" />
        <CustomText ft={20} mt={10}>
          Carregando...
        </CustomText>
      </View>
    )
  }

  if (rotas.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CustomText ft={22}>Nenhuma rota encontrada</CustomText>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header bgColor="blue" txtColor="white" size={40} color="white">
        {isOwnProfile
          ? 'Minhas Rotas'
          : `Rotas de ${motoristaName || 'Motorista'}`}
      </Header>

      <FlatList
        data={rotas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const [lng, lat] = item.endCoord || [0, 0]

          const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lng},${lat},14/300x300?access_token=${MAPBOX_TOKEN}`

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('EditRoute', { rota: item })}
              style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 15,
                marginBottom: 20,
                flexDirection: 'row',
                elevation: 4,
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 3 },
              }}
            >
              {/* IMAGEM DO MAPA MINI */}
              <Image
                source={{ uri: mapUrl }}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 12,
                  marginRight: 15,
                }}
              />

              <View style={{ flex: 1, justifyContent: 'center' }}>
                <CustomText ft={20} fw="bold">
                  {item.nameSchool}
                </CustomText>

                {item.region && (
                  <CustomText ft={16} color="#666">
                    Região: {item.region}
                  </CustomText>
                )}
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
