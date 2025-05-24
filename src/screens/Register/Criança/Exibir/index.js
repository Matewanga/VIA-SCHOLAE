import React, { useEffect, useState } from 'react'
import { FlatList, Alert, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Return } from '../../../../components'
import { db } from '../../../../config/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useUser } from '../../../../database'
import {
  Container,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Button,
  ButtonText,
  TitleText,
  Header,
  styles,
} from './styles'

export const ExibirCriancas = () => {
  const navigation = useNavigation()
  const { user } = useUser()
  const [criancas, setCriancas] = useState([])

  useEffect(() => {
    console.log('Usuário logado:', user)
    if (user?.id) {
      fetchCriancas()
    }
  }, [user])
  

  const fetchCriancas = async () => {
    try {
      const responsavelId = user?.id

      if (!responsavelId) {
        Alert.alert('Erro', 'Responsável não encontrado.')
        return
      }

      const criancasRef = collection(db, 'Criancas')
      const q = query(criancasRef, where('responsavelId', '==', responsavelId))
      const querySnapshot = await getDocs(q)

      const criancasList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setCriancas(criancasList)
    } catch (error) {
      console.error('Erro ao buscar crianças: ', error)
      Alert.alert('Erro', 'Erro ao buscar crianças.')
    }
  }

  useEffect(() => {
    fetchCriancas()
  }, [user])

  const handleCadastrarNovaCrianca = () => {
    navigation.navigate('RegisterCrianca')
  }

  const handleRoutePress = (item) => {
    navigation.navigate('RegisterCrianca')
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRoutePress(item)}>
      <TableRow>
        <TableCell>{item.username}</TableCell>
        <TableCell>{item.parentesco}</TableCell>
        <TableCell>{item.idade}</TableCell>
      </TableRow>
    </TouchableOpacity>
  )

  return (
    <Container>
      <Header>
        <TouchableOpacity style={styles.return}>
          <Return
            style={styles.return}
            onPress={() => navigation.navigate('Perfil')}
          />
        </TouchableOpacity>
        <TitleText>Crianças</TitleText>
      </Header>
      <Table>
        <TableHeader>
          <TableCell>Nome</TableCell>
          <TableCell>Parentesco</TableCell>
          <TableCell>Idade</TableCell>
        </TableHeader>

        {criancas.length > 0 ? (
          <FlatList
            data={criancas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        ) : (
          <TableRow>
            <TableCell colSpan={3}>Nenhuma criança cadastrada.</TableCell>
          </TableRow>
        )}
      </Table>

      {user && user.type === 'responsavel' && (
        <Button onPress={handleCadastrarNovaCrianca}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      )}
    </Container>
  )
}
