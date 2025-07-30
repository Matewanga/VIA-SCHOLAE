import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useLogin } from './script'
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
import { useNavigation } from '@react-navigation/native'

export const Login = () => {
  const { email, setEmail, password, setPassword, handleSignIn } = useLogin()
  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Container keyboardShouldPersistTaps="handled">
        <Header txtColor="text" bgColor="blue" color="white" size={40}>LOGIN</Header>

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
