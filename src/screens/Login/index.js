import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useLogin } from './script'
import {CustomInput, Header, Button, CustomText } from '../../components'
import Logo_ViaScholae from '../../../assets/Logo_ViaScholae.png'
import {
  Container,
  FormWrapper,
  FormCard,
  RegisterOption,
  LogoWrapper,
  RegisterOptions,
  CustomLogo
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
        <Header txtColor="white" bgColor="blue" color="white" size={40}>LOGIN</Header>

        <FormWrapper>
          <LogoWrapper>
            <CustomLogo source={Logo_ViaScholae} resizeMode="contain" />
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
                <CustomText ft={20} txtColor="text" mb={1}>É motorista e não possui cadastro?</CustomText>
                <CustomText ft={18} txtColor="cyan" mb={1} onPress={() => navigation.navigate('RegisterMotorista')}>Cadastre-se Aqui!</CustomText>
              </RegisterOption>
              <RegisterOption>
                <CustomText ft={20} txtColor="text" mb={1}>É Responsável e não possui cadastro?</CustomText>
                <CustomText ft={18} txtColor="cyan" mb={1} onPress={() => navigation.navigate('Register')}>Cadastre-se Aqui!</CustomText>
              </RegisterOption>
            </RegisterOptions>

            <Button onPress={handleSignIn} title="Entrar" width={200} height={45} ft={23} pd={0} />
          </FormCard>
        </FormWrapper>
      </Container>
    </KeyboardAvoidingView>
  )
}
