import React, { useEffect, useState } from 'react'
import { FlatList, Alert, TouchableOpacity, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../../database'
import { Container, Card, Foto } from './styles'
import { Button, Header, CustomText, Title } from '../../components'
import { Ionicons } from '@expo/vector-icons'
import { fetchCriancasDoResponsavel } from './script'

export const ExibirCriancas = () => {
  const navigation = useNavigation()
  const { user } = useUser()
  const [criancas, setCriancas] = useState([])

  const calculaIdade = (dataNasc) => {
    const [dia, mes, ano] = dataNasc.split('/')
    const nascimento = new Date(`${ano}-${mes}-${dia}`)
    const hoje = new Date()

    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mesAtual = hoje.getMonth()
    const diaAtual = hoje.getDate()
    const mesNasc = nascimento.getMonth()
    const diaNasc = nascimento.getDate()

    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
      idade--
    }

    return idade
  }

  useEffect(() => {
    async function carregarCriancas() {
      try {
        const lista = await fetchCriancasDoResponsavel(user.uid)
        setCriancas(lista)
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as crianças.')
      }
    }

    carregarCriancas()
  }, [user.uid])

  const renderItem = ({ item }) => (
    <Card>
      <TouchableOpacity
        style={{ position: 'absolute', top: -5, right: 15, zIndex: 1 }}
        onPress={() => Alert.alert('Excluir', `Excluir ${item.username}?`)}
      >
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditChildren', { criancaId: item.id, dadosCrianca: item })}>
        {item.profileImageUrl ? (
          <Foto source={{ uri: item.profileImageUrl }} />
        ) : (
          <View style={{
            width: 100,
            height: 100,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }} />
        )}

        <Title ft="25" txtColor="text">{item.username}</Title>
        <CustomText ft="18" mt="-20" txtColor="textsecondary">{calculaIdade(item.dataNasc)} anos</CustomText>
      </TouchableOpacity>
    </Card>
  )

  return (
    <Container>
      <Header
        bgColor="darkblue"
        txtColor="white"
        iconName="chevron-back"
        size={40}
        color="white"
      >Crianças</Header>

      <FlatList
        data={criancas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhuma criança cadastrada.
          </Text>
        }
        ListFooterComponent={
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Button
              title="Adicionar"
              txtColor="text"
              pd={15}
              br={20}
              width="65%"
              height={45}
              ft={16}
              fw="bold"
              onPress={() => navigation.navigate('RegisterCrianca')}
            />
          </View>
        }
      />
    </Container>
  )
}
