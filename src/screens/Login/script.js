import { useState } from 'react'
import { Alert } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useNavigation } from '@react-navigation/native'

export const useLogin = () => {
  const navigation = useNavigation()
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
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      Alert.alert('Erro', 'Email ou senha incorretos.')
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignIn,
  }
}