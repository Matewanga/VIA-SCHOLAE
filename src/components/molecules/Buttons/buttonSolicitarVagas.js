import React from "react";
import { useNavigation } from '@react-navigation/native'
import { BtnRegistro, BtnRegistroText } from './styles';

export const ButtonSolicitarVagas = ({ children, onPress }) => {
  return(
    <BtnRegistro onPress={onPress}>
        <BtnRegistroText>{children}</BtnRegistroText>
    </BtnRegistro>
    )
};
