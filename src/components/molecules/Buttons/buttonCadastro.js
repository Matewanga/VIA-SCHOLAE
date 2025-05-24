import React from "react";
import { BtnCadastro, BtnCadastroText } from './styles';


export const ButtonCadastro = ({ onPress, children }) => {
  return(
    <BtnCadastro onPress={onPress}>
      <BtnCadastroText>{children}</BtnCadastroText>
    </BtnCadastro>
    )
};
