import { useState, useEffect } from 'react'
import { useUser, saveProfilePic } from '../../database'
import { TouchableOpacity, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useNavigation } from '@react-navigation/native'
import { ProfilePic, Return } from '../../components'
import {
  styles,
  Container,
  Header,
  TitleText,
  ProfileContainer,
  FormContainer,
  Content,
  ContentText,
  Label,
  EditPictureText,
} from './styles'

export const EditProfile = () => {
  const navigation = useNavigation()
  const { user, setUser } = useUser()
  const [image, setImage] = useState(user?.profilePic || null)

  useEffect(() => {
    if (user?.profilePic) {
      setImage(user.profilePic)
    }
  }, [user])

  const pickImage = async () => {
    // Solicita permissões para acessar a galeria
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      Alert.alert('Erro', 'É necessário permitir o acesso à galeria!')
      return
    }

    // Abre a galeria para escolher a imagem
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Atualização para MediaTypeOptions
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result) // Adicionando log para inspecionar o retorno

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri
      const fileName = imageUri.split('/').pop()
      const path = FileSystem.documentDirectory + fileName

      // Copia a imagem para o diretório de documentos
      try {
        await FileSystem.copyAsync({ from: imageUri, to: path })
        console.log('Imagem copiada com sucesso', path)

        // Salva o caminho da imagem no banco de dados
        await saveProfilePic(path, user)

        // Atualiza o estado com a nova imagem
        setImage(path)
        if (user) {
          setUser({ ...user, profilePic: path })
        }
      } catch (error) {
        console.error('Erro ao copiar imagem', error)
        Alert.alert('Erro', 'Falha ao salvar a imagem.')
      }
    } else {
      console.log('Nenhuma imagem selecionada ou operação cancelada')
    }
  }

  return (
    <Container>
      <Header>
        <Return
          style={styles.back}
          onPress={() => navigation.navigate('Perfil')}
        />
        <TitleText>Edite suas Informações</TitleText>
      </Header>

      <ProfileContainer>
        <ProfilePic uri={image || user?.profilePic} />
        <TouchableOpacity onPress={pickImage}>
          <EditPictureText>Edit Picture</EditPictureText>
        </TouchableOpacity>
      </ProfileContainer>

      <FormContainer>
        <Content onPress={() => navigation.navigate('EditName')}>
          <Label>Nome</Label>
          <ContentText>{user ? user.username : 'Nome não disponível'}</ContentText>
        </Content>

        <Content onPress={() => navigation.navigate('EditPhone')}>
          <Label>Número</Label>
          <ContentText>
            {user ? user.phone : 'Número não disponível'}
          </ContentText>
        </Content>

        <Content onPress={() => navigation.navigate('EditEmail')}>
          <Label>Email</Label>
          <ContentText>
            {user ? user.email : 'Email não disponível'}
          </ContentText>
        </Content>

        <Content onPress={() => navigation.navigate('EditEnd')}>
          <Label>Endereço</Label>
          <ContentText>
            {user ? user.address : 'Endereço não disponível'}
          </ContentText>
        </Content>
      </FormContainer>
    </Container>
  )
}
