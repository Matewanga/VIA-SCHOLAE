import React from 'react'
import { EnterButton, EnterButtonText } from './styles'

export const Buttons = ({ onPress, title }) => {
  return (
    <EnterButton onPress={onPress}>
      <EnterButtonText>{title}</EnterButtonText>
    </EnterButton>
  )
}
