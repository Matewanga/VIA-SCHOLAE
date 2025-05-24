import React, { useState } from 'react'
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {
  Container,
  Title,
  AvatarContainer,
  Avatar,
  ButtonContainer,
  Button,
  ButtonText,
  ConfirmButton,
} from './styles'

export const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleNext = () => {
    if (!image) {
      Alert.alert('Erro', 'Por favor, selecione uma foto de perfil.')
      return
    }
    // Aqui você pode salvar a imagem no contexto ou banco de dados antes de navegar
    navigation.navigate('Home') // Ajuste para a tela correta
  }

  return (
    <Container>
      <Title>Escolha sua foto de perfil</Title>
      <AvatarContainer onPress={pickImage}>
        <Avatar
          source={
            image ? { uri: image } : require('../../../../assets/Foto-User-teste.jpg')
          }
        />
      </AvatarContainer>
      <ButtonContainer>
        <Button onPress={pickImage}>
          <ButtonText>Selecionar da Galeria</ButtonText>
        </Button>
        <Button onPress={takePhoto}>
          <ButtonText>Tirar uma Foto</ButtonText>
        </Button>
        <ConfirmButton onPress={handleNext}>
          <ButtonText>Confirmar</ButtonText>
        </ConfirmButton>
      </ButtonContainer>
    </Container>
  )
}
