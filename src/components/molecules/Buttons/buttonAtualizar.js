import React from 'react'
import { BtnAtualizar, TextButtonAtual } from './styles'

export const ButtonAtualizar = ({ onPress }) => {
  return (
    <BtnAtualizar onPress={onPress}>
        <TextButtonAtual>Atualizar</TextButtonAtual>
    </BtnAtualizar>
  )
}
