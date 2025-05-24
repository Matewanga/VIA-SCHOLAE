import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ButtonProfile,
  ButtonYourAccount,
  ButtonChildrenSettings,
  ButtonAccessibility,
  Return,
} from '../../components'
import {
  styles,
  Container,
  Header,
  TitleText,
  TextApp,
  LogoutButton,
  LogoutButtonText,
} from './styles'
import { useUser } from '../../database'

export const Settings = () => {
  const navigation = useNavigation()
  const { logout, user } = useUser()

  const handleLogout = async () => {
    try {
      // Remove os dados do usuário salvos no AsyncStorage
      await AsyncStorage.removeItem('@user_data')

      // Chama a função logout do contexto
      await logout()

      // Redireciona para a tela de login ou splash
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      })
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <Container>
      <Header>
        <Return
          style={styles.return}
          onPress={() => navigation.navigate('Perfil')}
        />
        <TitleText>Configurações</TitleText>
      </Header>

      <ButtonProfile />

      <TextApp>Configurações do App</TextApp>

      <ButtonYourAccount />

      {user && user.type === 'responsavel' && <ButtonChildrenSettings />}

      <ButtonAccessibility />

      <LogoutButton onPress={handleLogout}>
        <LogoutButtonText>Sair da conta</LogoutButtonText>
      </LogoutButton>
    </Container>
  )
}
