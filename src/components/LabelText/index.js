import React from 'react'
import { LabelText } from './styles'

export const CustomText = ({ children, txtColor, ft, mb, mt, ml, onPress, style }) => {
  return (
    <LabelText txtColor={txtColor} ft={ft} mb={mb} mt={mt} ml={ml} onPress={onPress} style={style}>
      {children}
    </LabelText>
  )
}
