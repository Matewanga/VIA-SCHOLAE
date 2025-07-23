import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useUser } from '../../database'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CustomLogo, CustomInput, Header, Button } from '../../components'
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      Alert.alert('Atenção!', 'Preencha todos os campos.')
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigation.navigate('MainHome')
      console.log('✅ Login realizado com sucesso')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      Alert.alert('Erro', 'Email ou senha incorretos.')
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Container keyboardShouldPersistTaps="handled">
        <Header title="Login" txtColor="text" bgColor="blue">Via Scholae</Header>

        <FormWrapper>
          <LogoWrapper>
            <CustomLogo />
          </LogoWrapper>

          <FormCard>
            <CustomInput
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              height={45}
              bgColor="#EEEEEE"
            />
            <CustomInput
              onChangeText={setPassword}
              isPassword
              value={password}
              placeholder="Senha"
              maxLength={16}
              height={45}
              bgColor="#EEEEEE"
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

            <Button onPress={handleSignIn} title="Entrar" width={200} height={45} ft={23} pd={0} />
          </FormCard>
        </FormWrapper>
      </Container>
    </KeyboardAvoidingView>
  )
}
