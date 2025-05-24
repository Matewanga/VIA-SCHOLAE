import React, { useState, useEffect } from 'react'
import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import axios from 'axios'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Header,
  Buttons,
  ButtonCadastro,
  CustomInput,
} from '../../components'
import {
  Container,
  Form,
  Title,
  Motorista,

} from './styles'

const db = getFirestore()

export const Register = () => {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [end, setEnd] = useState('')
  const [password, setPassword] = useState('')
  const [RG, setRG] = useState('')
  const [CPF, setCPF] = useState('')

  const handleRegistration = () => {
    if (
      !username ||
      !phone ||
      !email ||
      !end ||
      !cep ||
      !password ||
      !confPassword
    ) {
      Alert.alert('Atenção!', 'Preencha todos os campos.')
      return
    }

    if (password !== confPassword) {
      Alert.alert('Erro', 'As senhas não coincidem')
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user

        // Após o usuário ser criado, salva os dados no Firestore na coleção 'responsaveis'
        try {
          await setDoc(doc(db, 'responsaveis', user.uid), {
            username,
            phone,
            email,
            address: end,
            cep,
            senha: password,
            type: 'responsavel',
          })
          Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')
          navigation.navigate('MainHome')
        } catch (error) {
          console.error('Erro ao salvar dados no Firestore:', error)
          Alert.alert(
            'Erro',
            'Não foi possível salvar seus dados. Tente novamente.'
          )
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
        Alert.alert('Erro', 'Erro ao criar conta. Tente novamente.')
      })
  }

  return (
    <Container>
      <Header bgColor="blue" txtColor="text" title="Cadastro Responsavel" />

      <Title>Faça seu Cadastro:</Title>

      <Form>
        <CustomInput
          placeholder="Nome"
          onChangeText={setUsername}
          value={username}
          maxLength={30}
          height={50}
          width={300}
          mb={20}
          ph={10}
          bgColor="#e8e8e8"
        />
        <CustomInput
          placeholder="Endereço"
          onChangeText={setEnd}
          value={end}
          maxLength={100}
        />
        <CustomInput
          placeholder="Telefone"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          value={phone}
          maxLength={11}
        />
        <CustomInput
          placeholder="Senha"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          maxLength={16}
        />
        <CustomInput
          placeholder="RG"
          secureTextEntry
          onChangeText={setRG}
          value={RG}
          maxLength={10}
        />
        <CustomInput
          placeholder="CPF"
          secureTextEntry
          onChangeText={setCPF}
          value={CPF}
          maxLength={11}
        />

        <Title>Insira uma foto de Frente e verso da cnh</Title>

        <Buttons title="Tirar Foto"/>

        <Buttons title="Escolher Foto"/>

        <Buttons title="Cadastrar" onPress={handleRegistration}/>
      </Form>
    </Container>
  )
}
