import React from 'react'
import { TitleText } from './styles'

export const Title = ({ children, txtColor, ft, mb, mt, style }) => {
  return (
    <TitleText txtColor={txtColor} ft={ft} mb={mb} mt={mt} style={style}>
      {children}
    </TitleText>
  )
}
