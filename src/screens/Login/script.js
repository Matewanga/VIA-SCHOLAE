import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../../database'

export const useLogin = () => {
  const navigation = useNavigation()
  const { login } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      Alert.alert('Atenção!', 'Preencha todos os campos.')
      return
    }

    try {
      await login(email, password)
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainHome' }],
      })
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      Alert.alert('Erro', error.message || 'Email ou senha incorretos.')
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
