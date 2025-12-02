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
  getDoc,
  updateDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons'

export const SeatRequests = () => {
  const { user } = useUser()
  const [vagas, setVagas] = useState([])
  const [loading, setLoading] = useState(true)
  const [processando, setProcessando] = useState({})

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

  const MAPBOX_TOKEN =
    'pk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtZHMxYTdmNDBveHAyaXBwNmk0cGRtbDUifQ.mzr4-ccJpyUD5cH08FtGbQ'

  const handleStatus = async (idVaga, novoStatus) => {
    try {
      setProcessando((prev) => ({ ...prev, [idVaga]: true }))

      const vagaRef = doc(db, 'VagasSolicitadas', idVaga)
      await updateDoc(vagaRef, {
        status: novoStatus,
        dataAtualizacao: new Date().toISOString(),
      })

      setVagas((old) =>
        old.map((item) =>
          item.id === idVaga
            ? {
                ...item,
                status: novoStatus,
                dataAtualizacao: new Date().toISOString(),
              }
            : item
        )
      )

      if (novoStatus !== 'aceito') {
        setProcessando((prev) => ({ ...prev, [idVaga]: false }))
        return
      }

      const vagaAtualizada = vagas.find((v) => v.id === idVaga)
      if (!vagaAtualizada) {
        console.log('Vaga não encontrada.')
        setProcessando((prev) => ({ ...prev, [idVaga]: false }))
        return
      }

      const {
        idResponsavel,
        idRota,
        nomeResponsavel,
        fotoResponsavel,
        nomeEscola,
      } = vagaAtualizada

      console.log('Processando aceite para:', nomeResponsavel)

      const responsavelRef = doc(db, 'responsaveis', idResponsavel)
      const respDoc = await getDoc(responsavelRef).catch(() => null)

      let respData

      if (respDoc && respDoc.exists()) {
        respData = respDoc.data()
        console.log('Encontrado pelo ID do documento')
      } else {
        console.log('Tentando buscar por query...')
        const respQuery = query(
          collection(db, 'responsaveis'),
          where('id', '==', idResponsavel)
        )
        const respSnap = await getDocs(respQuery)

        if (respSnap.empty) {
          console.log('Responsável não encontrado.')
          setProcessando((prev) => ({ ...prev, [idVaga]: false }))
          return
        }

        respData = respSnap.docs[0].data()
      }

      const enderecoTexto =
        respData.endereco ||
        respData.enderecoTexto ||
        respData.address ||
        respData.enderecoCompleto

      if (!enderecoTexto) {
        console.log('Responsável não possui endereço salvo:', respData)
        setProcessando((prev) => ({ ...prev, [idVaga]: false }))
        return
      }

      console.log('Endereço encontrado:', enderecoTexto)

      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        enderecoTexto
      )}.json?access_token=${MAPBOX_TOKEN}&country=BR`

      const response = await fetch(url)
      const json = await response.json()

      if (!json.features || json.features.length === 0) {
        console.log('Endereço não encontrado no Mapbox:', json)
        setProcessando((prev) => ({ ...prev, [idVaga]: false }))
        return
      }

      const [lng, lat] = json.features[0].center
      console.log('Coordenadas encontradas:', lat, lng)

      const rotaRef = doc(db, 'rotas', idRota)
      const rotaDoc = await getDoc(rotaRef)

      if (!rotaDoc.exists()) {
        console.log('Rota original não encontrada')
        setProcessando((prev) => ({ ...prev, [idVaga]: false }))
        return
      }

      const rotaData = rotaDoc.data()

      const rotasFinaisRef = collection(db, 'rotas', idRota, 'rotasFinais')
      const qFinal = query(rotasFinaisRef, where('status', '==', 'ativa'))
      const snapFinal = await getDocs(qFinal)
      if (!snapFinal.empty) {
        const docExistente = snapFinal.docs[0]
        const rotaExistente = docExistente.data()

        const novosResponsaveis = [
          ...(rotaExistente.responsaveisIncluidos || []),
          {
            id: idResponsavel,
            nome: nomeResponsavel,
            foto: fotoResponsavel,
            escola: nomeEscola,
            endereco: enderecoTexto,
            coordenadas: { lat, lng },
            dataInclusao: new Date().toISOString(),
          },
        ]

        const novasCoords = [
          ...(rotaExistente.routeCoordsComResponsavel?.coordinates || []),
          { lat, lng },
        ]

        await updateDoc(docExistente.ref, {
          responsaveisIncluidos: novosResponsaveis,
          'routeCoordsComResponsavel.coordinates': novasCoords,
          dataAtualizacao: new Date().toISOString(),
        })

        await updateDoc(vagaRef, {
          rotaFinalId: docExistente.id,
          rotaFinalCriada: true,
        })

        console.log('🔄 Responsável adicionado à rota final já existente!')

        return
      }

      const rotaFinalId = `${idRota}_${idResponsavel}_${Date.now()}`

      const rotaFinal = {
        ...rotaData,

        responsaveisIncluidos: [
          {
            id: idResponsavel,
            nome: nomeResponsavel,
            foto: fotoResponsavel,
            escola: nomeEscola,
            endereco: enderecoTexto,
            coordenadas: { lat, lng },
            dataInclusao: new Date().toISOString(),
          },
        ],

        idRotaOriginal: idRota,
        idMotorista: user.uid,
        dataCriacao: new Date().toISOString(),
        status: 'ativa',
        ordem: snapFinal.size + 1,

        routeCoordsComResponsavel: {
          coordinates: [
            ...(rotaData.routeCoords?.coordinates || []),
            { lat, lng },
          ],
          type: 'LineString',
        },
      }

      const rotaFinalRef = doc(db, 'rotas', idRota, 'rotasFinais', rotaFinalId)
      await setDoc(rotaFinalRef, rotaFinal)

      console.log('✅ Rota final criada com sucesso!')

      await updateDoc(vagaRef, {
        rotaFinalId: rotaFinalId,
        rotaFinalCriada: true,
      })

      setVagas((old) =>
        old.map((item) =>
          item.id === idVaga
            ? {
                ...item,
                rotaFinalId: rotaFinalId,
                rotaFinalCriada: true,
              }
            : item
        )
      )
    } catch (err) {
      console.log('Erro ao aceitar vaga:', err)
    } finally {
      setProcessando((prev) => ({ ...prev, [idVaga]: false }))
    }
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
