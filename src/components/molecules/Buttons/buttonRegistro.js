import React from "react";
import { useNavigation } from '@react-navigation/native'
import { BtnRegistro, BtnRegistroText } from './styles';

export const ButtonRegistro = ({ children }) => {
  const navigation = useNavigation()
  return(
    <BtnRegistro onPress={() => navigation.navigate('Register')}>
        <BtnRegistroText>{children}</BtnRegistroText>
    </BtnRegistro>
    )
};
