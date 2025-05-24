import React from 'react'
import { BtnSettings, TextBtnSettings } from './styles'
import { useNavigation } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useTheme } from 'styled-components/native';

export const ButtonSettings = () => {
  const navigation = useNavigation()
  const theme = useTheme();
  return (
    <BtnSettings onPress={() => navigation.navigate('Settings')}>
      <FontAwesome name="cog" size={25} color={theme.text} />
      <TextBtnSettings>Configurações</TextBtnSettings>
    </BtnSettings>
  )
}
