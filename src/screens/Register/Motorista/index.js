import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import {
  Header,
  Title,
  CustomText,
  CustomInput,
  Button,
} from '../../../components'
import {
  Container,
  ButtonContainer,
  Form,
  ImgContainer,
  ImagePreview,
  ImageWrapper,
} from './styles'
import {
  fetchAddressByCep,
  formatCpf,
  handleRegisterMotorista,
  pickImage,
  formatCep,
} from './script'
import defaultProfile from '../../../../assets/default-user.jpg'

export const RegisterMotorista = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [end, setEnd] = useState('')
  const [cep, setCep] = useState('')
  const [RG, setRG] = useState('')
  const [CPF, setCPF] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [cnhFrente, setCnhFrente] = useState(null)
  const [cnhVerso, setCnhVerso] = useState(null)
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
      <Container contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled">

        <Header bgColor="blue" txtColor="white" color="white" size={40}>CADASTRO MOTORISTA</Header>
        <Title ft={35} mt={25} mb={1}>Faça seu Cadastro:</Title>

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
              title={image ? "Alterar foto" : "Escolher foto"}
              txtColor="text"
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
            isPhone
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
            placeholder="Senha"
            onChangeText={setPassword}
            isPassword
            value={password}
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

          {/* Campo para imagem da CNH */}
          <CustomText ft={23} mt={10} mb={20} txtColor="text">Insira uma foto frente e verso da CNH</CustomText>
          <Button title="Selecionar Frente CNH" width="70%" txtColor="text" onPress={() => pickImage(setCnhFrente)} />
          {cnhFrente && (
            <ImgContainer>
              <ImagePreview source={{ uri: cnhFrente }} resizeMode="cover" />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  borderRadius: 15,
                  padding: 5,
                }}
                onPress={() =>
                  Alert.alert(
                    'Remover imagem',
                    'Deseja remover a imagem "Frente da CNH"?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      { text: 'Remover', onPress: () => setCnhFrente(null), style: 'destructive' },
                    ]
                  )
                }
              >
                <MaterialIcons name="delete" size={20} color="white" />
              </TouchableOpacity>
            </ImgContainer>
          )}

          <Button title="Selecionar Verso CNH" width="70%" txtColor="text" onPress={() => pickImage(setCnhVerso)} />
          {cnhVerso && (
            <ImgContainer>
              <ImagePreview source={{ uri: cnhVerso }} resizeMode="cover" />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  borderRadius: 15,
                  padding: 5,
                }}
                onPress={() =>
                  Alert.alert(
                    'Remover imagem',
                    'Deseja remover a imagem "Verso da CNH"?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      { text: 'Remover', onPress: () => setCnhVerso(null), style: 'destructive' },
                    ]
                  )
                }
              >
                <MaterialIcons name="delete" size={20} color="white" />
              </TouchableOpacity>
            </ImgContainer>
          )}

          <CustomText ft={20} mt={10} mb={20} txtColor="text">
            Ja possúi cadastro?{' '}
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
              title="Continuar"
              txtColor="text"
              pd={15}
              br={20}
              width="48%"
              height={45}
              ft={16}
              fw="bold"
              onPress={() =>
                handleRegisterMotorista({
                  username,
                  phone,
                  email,
                  end,
                  cep,
                  RG,
                  CPF,
                  password,
                  confPassword,
                  cnhFrente,
                  cnhVerso,
                  image,
                  navigation,
                })
              }
            />
          </ButtonContainer>
        </Form>
      </Container>
    </KeyboardAvoidingView>
  )
}
