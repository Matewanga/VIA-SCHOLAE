import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, Alert, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useUser } from '../../../database'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../config/firebase' // Importe sua configuração do Firestore
import {
  Container,
  TitleText,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Header,
  Button,
  ButtonText,
  styles,
} from './styles'
import { Return } from '../../../components'

export const ExibirRotas = () => {
  const { user } = useUser() // Acessando os dados do usuário
  const [rotas, setRotas] = useState([]) // Estado para armazenar as rotas
  const navigation = useNavigation()
  const route = useRoute()
  const { motoristaId } = route.params || {}

  // Função para buscar as rotas do Firestore
  const fetchRotas = async () => {
    try {
      const rotasCollection = collection(db, 'rotas')
      const q = query(rotasCollection, where('motoristaId', '==', motoristaId))
      const querySnapshot = await getDocs(q)

      const rotasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setRotas(rotasData.length > 0 ? rotasData : []) // Atualiza o estado com as rotas encontradas
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar as rotas')
      console.error('Erro ao buscar rotas: ', error)
    }
  }

  // Hook para carregar as rotas sempre que o motoristaId mudar
  useEffect(() => {
    if (motoristaId) {
      fetchRotas()
    }
  }, [motoristaId])

  // Função para navegar até a tela de detalhes da rota
  const handleRoutePress = (item) => {
    navigation.navigate('RotaMap', {
      routeId: item.id,
      cepStart: item.cepStart,
      cepEnd: item.cepEnd,
      nomeEscola: item.nomeEscola,
      numeroEscola: item.numeroEscola,
      motoristaId: user?.id,
      responsavelId: user?.id,
    })
  }

  // Renderiza cada item da lista de rotas
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRoutePress(item)}>
      <TableRow>
        <TableCell style={{ fontWeight: 400 }}>{item.startPoint}</TableCell>
        <TableCell style={{ fontWeight: 400 }}>{item.endPoint}</TableCell>
        <TableCell style={{ fontWeight: 400 }}>{item.nomeEscola}</TableCell>
        <TableCell style={{ fontWeight: 400 }}>{item.numeroEscola}</TableCell>
        <TableCell style={{ fontWeight: 400 }}>{item.regiao}</TableCell>
      </TableRow>
    </TouchableOpacity>
  )

  return (
    <Container>
      <Header>
        <TouchableOpacity style={styles.return}>
          <Return onPress={() => navigation.navigate('Perfil')} />
        </TouchableOpacity>
        <TitleText>Rotas</TitleText>
      </Header>
      <Table>
        <TableHeader>
          <TableCell>Início</TableCell>
          <TableCell>Destino</TableCell>
          <TableCell>Escola</TableCell>
          <TableCell>Número</TableCell>
          <TableCell>Região</TableCell>
        </TableHeader>
        {rotas.length > 0 ? (
          <FlatList
            data={rotas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        ) : (
          <View style={styles.row}>
            <Text style={styles.cell} colSpan={4}>
              Nenhuma rota encontrada.
            </Text>
          </View>
        )}
      </Table>
      {user && user.type === 'motorista' && (
        <Button onPress={() => navigation.navigate('RegistroRota')}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      )}
    </Container>
  )
}
