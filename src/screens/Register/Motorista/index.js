import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../config/firebase'
import storage from '@react-native-firebase/storage'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import axios from 'axios'
import { TouchableOpacity, Alert, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import {
  CustomLogo,
  CustomLabelText,
  ButtonCadastro,
  CustomInput,
  Line,
  Return,
} from '../../../components'
import Checkbox from 'expo-checkbox'
import {
  styles,
  Container,
  LogoContainer,
  Form,
  TitleText,
  ImgContainer,
  ImagePreview,
  CheckBoxContainer,
  TermsText,
  TermsText1,
} from './styles'

const db = getFirestore()

export const RegisterMotorista = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [end, setEnd] = useState('')
  const [cep, setCEP] = useState('')
  const [vagas, setVagas] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [cnhFrente, setCnhFrente] = useState(null)
  const [cnhVerso, setCnhVerso] = useState(null)
  const [isChecked, setChecked] = useState(false)

  const handleGetAddress = async (cep) => {
    if (cep.length !== 8) return
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const { logradouro, localidade, uf } = response.data
      if (logradouro) {
        setEnd(`${logradouro}, ${localidade} - ${uf}`)
      } else {
        Alert.alert('Erro', 'CEP não encontrado')
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar o endereço')
    }
  }

  const handleRegister = async () => {
    if (
      !username ||
      !phone ||
      !email ||
      !end ||
      !cep ||
      !vagas ||
      !password ||
      !confPassword
    ) {
      Alert.alert(
        'Atenção!',
        'Preencha todos os campos e insira as imagens da CNH.'
      )
      return
    }

    if (password !== confPassword) {
      Alert.alert('Erro', 'As senhas não coincidem')
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user
        try {
          await setDoc(doc(db, 'motoristas', user.uid), {
            username,
            phone,
            email,
            address: end,
            cep,
            vagas,
            senha: password,
            type: 'motorista',
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

  useEffect(() => {
    if (cep.length === 8) {
      handleGetAddress(cep)
    }
  }, [cep])

  // Ao selecionar a imagem, chame saveImageLocally e passe o caminho da imagem não criptografada
  const pickImage = async (setImage, filename) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert('Erro', 'É necessário permitir o acesso à galeria!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
  }

  // Função para fazer o upload da imagem para o Firebase Storage
  const uploadImageToStorage = async (uri, fileName) => {
    const reference = storage().ref(fileName)
    await reference.putFile(uri) // Faz o upload da imagem diretamente do URI
    const downloadUrl = await reference.getDownloadURL() // Recupera a URL de download da imagem
    return downloadUrl
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LogoContainer>
          <TouchableOpacity style={styles.return}>
            <Return
              style={styles.return}
              onPress={() => navigation.navigate('Splash')}
            />
          </TouchableOpacity>
          <CustomLogo style={styles.img} />
        </LogoContainer>

        <Form>
          <TitleText>Registro Motorista</TitleText>
          <Line style={styles.line}></Line>

          <CustomLabelText>Digite seu nome completo</CustomLabelText>
          <CustomInput
            placeholder="Insira seu nome"
            onChangeText={setUsername}
            value={username}
            maxLength={30}
          />

          <CustomLabelText>Digite seu telefone</CustomLabelText>
          <CustomInput
            placeholder="Insira seu número de telefone"
            keyboardType="phone-pad"
            onChangeText={setPhone}
            value={phone}
            maxLength={11}
          />

          <CustomLabelText>Digite seu Email</CustomLabelText>
          <CustomInput
            placeholder="Insira seu Email"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            maxLength={100}
          />

          <CustomLabelText>Digite seu Endereço</CustomLabelText>
          <CustomInput
            placeholder="Insira seu Endereço"
            onChangeText={setEnd}
            value={end}
            maxLength={100}
          />

          <CustomLabelText>Digite seu CEP</CustomLabelText>
          <CustomInput
            placeholder="Insira seu CEP"
            onChangeText={setCEP}
            value={cep}
            maxLength={8}
            keyboardType="phone-pad"
          />

          <CustomLabelText>Insira a quantidade de vagas na van</CustomLabelText>
          <CustomInput
            placeholder="Insira a quantidades de assentos que a van possui"
            keyboardType="phone-pad"
            onChangeText={setVagas}
            value={vagas}
            maxLength={2}
          />

          <CustomLabelText>Digite uma senha</CustomLabelText>
          <CustomInput
            placeholder="Digite uma senha"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            maxLength={16}
          />

          <CustomLabelText>Confirme sua senha</CustomLabelText>
          <CustomInput
            placeholder="Confirme sua senha"
            secureTextEntry
            onChangeText={setConfPassword}
            value={confPassword}
            maxLength={16}
          />

          {/* Campo para imagem da CNH (frente) */}
          <CustomLabelText>Adicione a frente da CNH</CustomLabelText>
          <TouchableOpacity
            title={cnhFrente ? 'Alterar imagem' : 'Escolha uma imagem'}
            onPress={() => pickImage(setCnhFrente, 'cnhFrente.jpg')}
          >
            <ImgContainer>
              <CustomLabelText>Selecionar Imagem</CustomLabelText>
              {cnhFrente && (
                <ImagePreview source={{ uri: cnhFrente }} resizeMode="cover" />
              )}
            </ImgContainer>
          </TouchableOpacity>

          <CustomLabelText>Adicione o verso da CNH</CustomLabelText>
          <TouchableOpacity
            title={cnhVerso ? 'Alterar imagem' : 'Escolha uma imagem'}
            onPress={() => pickImage(setCnhVerso, 'cnhVerso.jpg')}
          >
            <ImgContainer>
              <CustomLabelText>Selecionar Imagem</CustomLabelText>
              {cnhVerso && (
                <ImagePreview source={{ uri: cnhVerso }} resizeMode="cover" />
              )}
            </ImgContainer>
          </TouchableOpacity>

          <CheckBoxContainer>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? '#E1B415' : undefined}
            />
            <TermsText1>Aceito os </TermsText1>
            <TermsText onPress={() => navigation.navigate('TermosdeUso')}>
              Termos de Uso
            </TermsText>
          </CheckBoxContainer>

          <ButtonCadastro onPress={handleRegister}>
            <CustomLabelText style={{ color: '#FFF' }}>
              Cadastrar
            </CustomLabelText>
          </ButtonCadastro>
        </Form>
      </ScrollView>
    </Container>
  )
}
