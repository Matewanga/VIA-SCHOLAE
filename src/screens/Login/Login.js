import React, { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useUser } from '../../database'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CustomLogo, CustomInput, Header, Buttons } from '../../components'
import {
  Container,
  FormWrapper,
  FormCard,
  RegisterOption,
  RegisterLink,
  RegisterText,

  LogoWrapper,
  RegisterOptions,
} from './styles'

export const Login = () => {
  const navigation = useNavigation()
  const { login } = useUser()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    if (phone === '' || password === '') {
      Alert.alert('Atenção!', 'Preencha todos os campos.')
      return
    }

    try {
      console.log('Iniciando login...')

      // Chama a função de login do contexto
      await login(phone, password)

      // Se o login for bem-sucedido, navega para a tela principal
      navigation.navigate('MainHome')
      console.log('✅ Login realizado com sucesso')
    } catch (error) {
      // Em caso de erro, exibe um alerta
      console.error('Erro ao fazer login:', error)
      Alert.alert('Erro', 'Número de telefone ou senha incorretos.')
    }
  }

  return (
    <Container>
      <Header title="Login" txtColor="text" bgColor="blue"/>

      <FormWrapper>
        <LogoWrapper>
          <CustomLogo />
        </LogoWrapper>

        <FormCard>
          <CustomInput
            onChangeText={setPhone}
            value={phone}
            placeholder="Telefone"
            keyboardType="phone-pad"
          />
          <CustomInput
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            secureTextEntry
            maxLength={16}
          />

          <RegisterOptions>
            <RegisterOption>
              <RegisterText>É motorista e não possui cadastro?</RegisterText>
              <RegisterLink
                onPress={() => navigation.navigate('RegisterMotorista')}
              >
                Cadastre-se Aqui!
              </RegisterLink>
            </RegisterOption>
            <RegisterOption>
              <RegisterText>É Responsável e não possui cadastro?</RegisterText>
              <RegisterLink onPress={() => navigation.navigate('Register')}>
                Cadastre-se Aqui!
              </RegisterLink>
            </RegisterOption>
          </RegisterOptions>

          <Buttons onPress={handleSignIn} title="Entrar"/>
        </FormCard>
      </FormWrapper>
    </Container>
  )
}
