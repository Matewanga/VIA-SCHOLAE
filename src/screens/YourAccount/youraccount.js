import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ButtonPassword, Return } from '../../components'
import { styles, Container, Header, TitleText } from './styles';

export const YourAccount = () => {
  const navigation = useNavigation()
  return (
    <Container>
      {/* Cabeçalho da tela */}
      <Header>
        <Return onPress={() => navigation.navigate('Settings')}></Return>
        <TitleText>Conta</TitleText>
      </Header>

      {/* Botão Change Password */}
      <ButtonPassword></ButtonPassword>
    </Container>
  )
};