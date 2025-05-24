import React from 'react'
import {
  BtnCriançaOption,
  IconCrContainer,
  OptionTextCr,
} from './styles'
import { useNavigation } from '@react-navigation/native'
//Importa a bibloteca de icones
import { Ionicons } from '@expo/vector-icons'
import { Children } from '../../../../assets/icons'
import { useTheme } from 'styled-components/native';

export const ButtonChildrenSettings = () => {
  const navigation = useNavigation()
  const theme = useTheme();
  return (
    <BtnCriançaOption onPress={() => navigation.navigate('ExibirCrianca')}>
      <IconCrContainer>
        <Children color={theme.text}/>
        <OptionTextCr>Crianças</OptionTextCr>
      </IconCrContainer>
      <Ionicons name="chevron-forward-outline" size={24} color={theme.gray} />
    </BtnCriançaOption>
  )
}
