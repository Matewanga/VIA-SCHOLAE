import React from 'react'
import { BtnVagas, BtnVagasText } from './styles'
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';

export const ButtonVagas = ({ onPress }) => {
  const theme = useTheme();
  return (
    <BtnVagas onPress={onPress}>
      <FontAwesome name="users" size={25} color={theme.text} />
      <BtnVagasText>Vagas</BtnVagasText>
    </BtnVagas>
  )
}
