import React from "react";
import { BtnMessage, BtnMessageText } from './styles';


export const ButtonMessage = ({ onPress, children }) => {
  return (
    <BtnMessage onPress={onPress}>
      <BtnMessageText>{children}</BtnMessageText>
    </BtnMessage>
  );
};

