import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import { Container, Title, Header, Input } from './styles'
import { ButtonCadastro, Return, Line } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../../database'
import axios from 'axios'
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../../config/firebase"

export const RegistroRota = () => {
  const [startPoint, setStartPoint] = useState('')
  const [endPoint, setEndPoint] = useState('')
  const [regiao, setRegiao] = useState('')
  const [cepStart, setCepStart] = useState('')
  const [cepEnd, setCepEnd] = useState('')
  const [numeroEscola, setNumeroEscola] = useState('')
  const [nomeEscola, setNomeEscola] = useState('')
  const navigation = useNavigation()
  const { user } = useUser() // Acessar os dados do usuário

  // Função para buscar endereço usando o CEP
  const handleGetAddress = async (cep, isStart) => {
    if (cep.length !== 8) {
      return
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const { logradouro, localidade, uf } = response.data

      if (logradouro) {
        if (isStart) {
          setStartPoint(logradouro)
        } else {
          setEndPoint(logradouro)
        }
      } else {
        Alert.alert('Erro', 'CEP não encontrado')
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar o endereço')
    }
  }

  useEffect(() => {
    if (cepStart) {
      handleGetAddress(cepStart, true)
    }
  }, [cepStart])

  useEffect(() => {
    if (cepEnd) {
      handleGetAddress(cepEnd, false)
    }
  }, [cepEnd])

  const handleRegisterRoute = async () => {
    if (
      startPoint === '' ||
      endPoint === '' ||
      regiao === '' ||
      cepStart === '' ||
      cepEnd === '' ||
      numeroEscola === '' ||
      nomeEscola === ''
    ) {
      Alert.alert('Atenção!', 'Preencha todos os campos.')
      return
    }

    if (cepStart.length !== 8 || cepEnd.length !== 8) {
      Alert.alert('Erro', 'Os CEPs devem ter 8 dígitos')
      return
    }

    if (cepStart === cepEnd) {
      Alert.alert('Erro', 'Os CEPs não devem coincidir')
      return
    }

    try {
      const rotasCollection = collection(db, 'rotas')
      await addDoc(rotasCollection, {
        startPoint,
        cepStart,
        endPoint,
        cepEnd,
        regiao,
        nomeEscola,
        numeroEscola,
        motoristaId: user.id,
      })

      Alert.alert('Sucesso', 'Cadastro da rota realizado com sucesso!')
      navigation.navigate('ExibirRota')
    } catch (error) {
      console.error('Erro ao cadastrar rota: ', error)
      Alert.alert('Erro', 'Erro ao cadastrar a rota. Tente novamente.')
    }
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity>
          <Return onPress={() => navigation.navigate('ExibirRota')} />
        </TouchableOpacity>
        <Title>Registrar Rota</Title>
      </Header>
      <Input
        placeholder="Ponto de Partida"
        value={startPoint}
        onChangeText={setStartPoint}
      />
      <Input
        placeholder="CEP do Ponto de Partida"
        value={cepStart}
        onChangeText={setCepStart}
        keyboardType="numeric"
        maxLength={8}
      />
      <Input
        placeholder="Ponto de Chegada"
        value={endPoint}
        onChangeText={setEndPoint}
      />
      <Input
        placeholder="CEP do Ponto de Chegada"
        value={cepEnd}
        onChangeText={setCepEnd}
        keyboardType="numeric"
        maxLength={8}
      />
      <Input
        placeholder="Nome da Escola"
        value={nomeEscola}
        onChangeText={setNomeEscola}
      />
      <Input
        placeholder="Número da Escola"
        value={numeroEscola}
        onChangeText={setNumeroEscola}
        keyboardType="numeric"
      />
      <Input
        placeholder="Área de Operação"
        value={regiao}
        onChangeText={setRegiao}
      />
      <Line style={{ marginBottom: 25 }} />
      <ButtonCadastro onPress={handleRegisterRoute}>Cadastrar</ButtonCadastro>
    </Container>
  )
}
