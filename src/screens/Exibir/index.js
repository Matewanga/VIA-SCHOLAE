import React, { useEffect, useState } from 'react'
import { FlatList, Alert, TouchableOpacity, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../config/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useUser } from '../../database'
import { Container, Card, Foto, Idade, Nome } from './styles'
import { Button, Header, CustomText, Title } from '../../components'
import { Ionicons } from '@expo/vector-icons'

export const ExibirCriancas = () => {
  const navigation = useNavigation()
  const { user } = useUser()

  const [criancas, setCriancas] = useState([])

  // Função para calcular idade a partir da data no formato "dd/mm/yyyy"
  const calculaIdade = (dataNasc) => {
    const [dia, mes, ano] = dataNasc.split('/')
    const nascimento = new Date(`${ano}-${mes}-${dia}`)
    const hoje = new Date()

    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mesAtual = hoje.getMonth()
    const diaAtual = hoje.getDate()
    const mesNasc = nascimento.getMonth()
    const diaNasc = nascimento.getDate()

    // Ajusta se ainda não fez aniversário no ano atual
    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
      idade--
    }

    return idade
  }

  // Busca crianças do responsável no Firestore
  const fetchCriancas = async () => {
    try {
      const q = query(collection(db, 'criancas'), where('responsavelId', '==', user.uid))
      const querySnapshot = await getDocs(q)

      const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setCriancas(lista)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as crianças.')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCriancas()
  }, [])

  // Renderiza cada criança na FlatList
  const renderItem = ({ item }) => (
    <Card>
      <TouchableOpacity
        style={{ position: 'absolute', top: -5, right: 15, zIndex: 1 }}
        onPress={() => Alert.alert('Excluir', `Excluir ${item.username}?`)}
      >
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>

      <TouchableOpacity>
        {item.profileImageUrl ? (
          <Foto source={{ uri: item.profileImageUrl }} />
        ) : (
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
          </View>
        )}

        <Title ft="25">{item.username}</Title>
        <CustomText ft="18" mt="-20" txtColor="secondary">{calculaIdade(item.dataNasc)} anos</CustomText>
      </TouchableOpacity>
    </Card>
  )

  return (
    <Container>
      <Header bgColor="darkblue" title="Crianças" txtColor="text">Via Scholae</Header>
      <FlatList
        data={criancas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhuma criança cadastrada.
          </Text>
        }
      />
      <Button
        title="Adicionar"
        color="white"
        pd={15}
        br={20}
        width="65%"
        height={45}
        ft={16}
        fw="bold"
        onPress={() => navigation.navigate('RegisterCrianca')}
      />
    </Container>
  )
}
