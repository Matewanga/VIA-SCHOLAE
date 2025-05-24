import React from 'react'
import { BtnManageRoutes, BtnManegeRoutesText } from './styles'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';

export const BtnRotas = ({ onPress }) => {
  const theme = useTheme();
  return (
    <BtnManageRoutes onPress={onPress}>
      <Ionicons name="map" size={20} color={theme.text} />
      <BtnManegeRoutesText>Rotas</BtnManegeRoutesText>
    </BtnManageRoutes>
  )
}
