import React from 'react'
import { BtnSenha, ContentSenha, TextButtonSenha } from './styles'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';

export const ButtonPassword = () => {
  const navigation = useNavigation()
  const theme = useTheme();
  return (
    <BtnSenha onPress={() => navigation.navigate('UpdatePassword')}>
      <ContentSenha>
        <MaterialIcons name="lock" size={24} color={theme.text} />
        <TextButtonSenha>Troque sua senha</TextButtonSenha>
      </ContentSenha>
      <Ionicons name="chevron-forward" size={24} color={theme.gray} />
    </BtnSenha>
  )
}
