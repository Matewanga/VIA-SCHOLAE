import { doc, updateDoc, ref, uploadBytes, getDownloadURL } from 'firebase/firestore'
import { db, storage  } from '../../config/firebase'
import * as ImagePicker from 'expo-image-picker'

export const updateUserProfile = async (user, dataToUpdate) => {
  if (!user?.uid || !user?.tipo) throw new Error('Usuário inválido')

  const isResponsavel = user.tipo === 'responsavel'
  const collectionName = isResponsavel ? 'responsaveis' : 'motoristas'
  const userRef = doc(db, collectionName, user.uid)

  await updateDoc(userRef, dataToUpdate)
}


export const editUserPhoto = async (user, refreshUserData) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    })

    if (!result.canceled) {
      const image = result.assets[0]
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

      await refreshUserData()
      return true
    }
    return false
  } catch (error) {
    console.error('Erro ao atualizar foto de perfil:', error)
    throw error
  }
}
