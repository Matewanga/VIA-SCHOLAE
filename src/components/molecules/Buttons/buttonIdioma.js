import React from 'react'
import {
  BtnIdioma,
  ContentIdioma,
  TextButtonIdoma,
  OptionRightIdioma,
  OptionSubTextIdioma,
} from './styles'
import { useNavigation } from '@react-navigation/native'
//Importa a bibloteca de icones
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';

export const ButtonLanguage = () => {
  const navigation = useNavigation()
  const theme = useTheme();
  return (
    <BtnIdioma onPress={() => navigation.navigate('Language')}>
      <ContentIdioma>
        <MaterialIcons name="language" size={24} color={theme.text} />
        <TextButtonIdoma>Idioma</TextButtonIdoma>
      </ContentIdioma>
      <OptionRightIdioma>
        <OptionSubTextIdioma>Português (BR-PT)</OptionSubTextIdioma>
        <Ionicons name="chevron-forward" size={24} color={theme.gray} />
      </OptionRightIdioma>
    </BtnIdioma>
  )
}
