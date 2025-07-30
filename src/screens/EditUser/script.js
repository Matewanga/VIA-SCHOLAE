import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../config/firebase'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

// Atualiza os dados do usuário com base no tipo
export const handleUpdateProfile = async (user, formData, refreshUserData) => {
  if (!user?.uid || !user?.tipo) throw new Error('Usuário inválido')

  const isResponsavel = user.tipo === 'responsavel'
  const collectionName = isResponsavel ? 'responsaveis' : 'motoristas'
  const userRef = doc(db, collectionName, user.uid)

  const dataToUpdate = {
    username: formData.nome,
    email: formData.email,
    phone: formData.telefone,
    cep: formData.cep,
    address: formData.endereco,
    RG: formData.rg,
    CPF: formData.cpf,
  }

  if (isResponsavel) {
    dataToUpdate.parentesco = formData.parentesco
  } else {
    dataToUpdate.placaVan = formData.placaVan
    dataToUpdate.escolas = formData.escolas
  }

  try {
    await updateDoc(userRef, dataToUpdate)
    if (refreshUserData) await refreshUserData()
    return true
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    throw error
  }
}

// Função completa com Alert embutido
export const editUserPhoto = async (user, refreshUserData) => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      'Editar Foto de Perfil',
      'Escolha uma opção:',
      [
        {
          text: 'Tirar Foto',
          onPress: async () => {
            try {
              const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
              })

              if (!result.canceled) {
                await uploadAndSave(result.assets[0], user, refreshUserData)
                resolve(true)
              } else {
                resolve(false)
              }
            } catch (err) {
              console.error('Erro ao tirar foto:', err)
              reject(err)
            }
          },
        },
        {
          text: 'Galeria',
          onPress: async () => {
            try {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
              })

              if (!result.canceled) {
                await uploadAndSave(result.assets[0], user, refreshUserData)
                resolve(true)
              } else {
                resolve(false)
              }
            } catch (err) {
              console.error('Erro ao escolher imagem:', err)
              reject(err)
            }
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => resolve(false),
        },
      ],
      { cancelable: true }
    )
  })
}

// Função auxiliar privada para upload
const uploadAndSave = async (image, user, refreshUserData) => {
  const response = await fetch(image.uri)
  const blob = await response.blob()

  const imageRef = ref(storage, `profileImages/${user.uid}.jpg`)
  await uploadBytes(imageRef, blob)

  const downloadURL = await getDownloadURL(imageRef)

  const isResponsavel = user.tipo === 'responsavel'
  const collectionName = isResponsavel ? 'responsaveis' : 'motoristas'
  const userRef = doc(db, collectionName, user.uid)

  await updateDoc(userRef, {
    profileImageUrl: downloadURL,
  })

  if (refreshUserData) await refreshUserData()
}
