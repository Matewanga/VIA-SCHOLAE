import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header, Button, CustomInput, Title, CustomText } from '../../../components'
import { Container, Form, ButtonContainer, ImageWrapper } from './styles'
import defaultProfile from '../../../../assets/default-user.jpg'

import {
  formatCep,
  formatCpf,
  fetchAddressByCep,
  handleRegisterResponsavel,
  pickImage,
} from './scripts'

export const Register = () => {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [end, setEnd] = useState('')
  const [cep, setCep] = useState('')
  const [RG, setRG] = useState('')
  const [CPF, setCPF] = useState('')
  const [parentesco, setParentesco] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    fetchAddressByCep(cep, setEnd)
  }, [cep])

  const handleCepChange = (text) => {
    setCep(formatCep(text))
  }

  const handleCpfChange = (text) => {
    setCPF(formatCpf(text))
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Container contentContainerStyle={{ paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
        <Header bgColor="blue" txtColor="text" title="CADASTRO RESPONSÁVEL">Via Scholae</Header>
        <Title ft={35} mt={25} mb={1}>
          Faça seu Cadastro:
        </Title>

        <Form>
          <ImageWrapper>
            <Image
              source={image ? { uri: image } : defaultProfile}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </ImageWrapper>
          <ButtonContainer style={{ marginBottom: 20 }}>
            <Button
              title={image ? 'Alterar foto' : 'Escolher foto'}
              color="white"
              pd={15}
              br={20}
              width="60%"
              height={45}
              ft={16}
              fw="bold"
              onPress={() => pickImage(setImage)}
            />
          </ButtonContainer>

          <CustomInput
            placeholder="Nome"
            onChangeText={setUsername}
            value={username}
            maxLength={30}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="Telefone"
            keyboardType="phone-pad"
            onChangeText={setPhone}
            value={phone}
            maxLength={11}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="CEP"
            keyboardType="phone-pad"
            onChangeText={handleCepChange}
            value={cep}
            maxLength={9}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="Endereço"
            onChangeText={setEnd}
            value={end}
            maxLength={100}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="RG"
            onChangeText={setRG}
            value={RG}
            maxLength={10}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="CPF"
            keyboardType="phone-pad"
            onChangeText={handleCpfChange}
            value={CPF}
            maxLength={14}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="Parentesco"
            onChangeText={setParentesco}
            value={parentesco}
            maxLength={11}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="Senha"
            onChangeText={setPassword}
            isPassword value={password}
            maxLength={16}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="Confirmar Senha"
            onChangeText={setConfPassword}
            isPassword
            value={confPassword}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
        </Form>

        <CustomText ft={20} mt={10} mb={20} txtColor="black">
          Já possui cadastro?{' '}
          <CustomText
            ft={20}
            txtColor="cyan"
            style={{ textDecorationLine: 'underline' }}
            onPress={() => navigation.navigate('Login')}
          >
            Faça login aqui!
          </CustomText>
        </CustomText>

        <ButtonContainer>
          <Button
            title="Cadastrar"
            color="white"
            pd={15}
            br={20}
            width="65%"
            height={45}
            ft={16}
            fw="bold"
            onPress={() =>
              handleRegisterResponsavel({
                image,
                username,
                phone,
                email,
                end,
                cep,
                RG,
                CPF,
                parentesco,
                password,
                confPassword,
                navigation,
              })
            }
          />
        </ButtonContainer>
      </Container>
    </KeyboardAvoidingView>
  )
}
