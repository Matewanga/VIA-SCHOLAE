import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  BtnYourAccount,
  IconAcContainer,
  TextAcContainer,
  OptionTextAc,
  SubTextAc,
} from './styles'
//Importa a bibloteca de icones
import { Ionicons } from '@expo/vector-icons'
import { IconUser } from '../../../../assets/icons'
import { useTheme } from 'styled-components/native';

export const ButtonYourAccount = () => {
  const navigation = useNavigation()
  const theme = useTheme();
  return (
    <BtnYourAccount onPress={() => navigation.navigate('YourAccount')}>
      <IconAcContainer>
        <IconUser color={theme.text}/>
        <TextAcContainer>
          <OptionTextAc>Conta</OptionTextAc>
          <SubTextAc>Gerencie suas informações</SubTextAc>
        </TextAcContainer>
      </IconAcContainer>
      <Ionicons name="chevron-forward-outline" size={24} color={theme.gray} />
    </BtnYourAccount>
  )
}
