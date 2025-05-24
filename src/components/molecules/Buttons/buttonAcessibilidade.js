import React from 'react'
import {
  BtnAcessibilidadeOption,
  IconAcesContainer,
  OptionTextAces,
} from './styles'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { IconAccessibility } from '../../../../assets/icons'
import { useTheme } from 'styled-components/native';

export const ButtonAccessibility = () => {
  const navigation = useNavigation()
  const theme = useTheme();

  return (
    <BtnAcessibilidadeOption
      onPress={() => navigation.navigate('Accessibility')}
    >
      <IconAcesContainer>
        <IconAccessibility color={theme.text}/>
        <OptionTextAces>Acessibilidade</OptionTextAces>
      </IconAcesContainer>
      <Ionicons name="chevron-forward-outline" size={24} color={theme.gray} />
    </BtnAcessibilidadeOption>
  )
}
