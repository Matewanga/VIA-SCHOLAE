import React from 'react'
import { BtnCrianças, BtnCriançasText } from './styles'
import { useNavigation } from '@react-navigation/native'
//Importa a bibloteca de icones
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';

export const ButtonChildren = () => {
  const navigation = useNavigation()
  const theme = useTheme();
  return (
    <BtnCrianças onPress={() => navigation.navigate('ExibirCrianca')}>
      <FontAwesome name="users" size={25} color={theme.text} />
      <BtnCriançasText>Crianças</BtnCriançasText>
    </BtnCrianças>
  )
}
