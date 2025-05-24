//Importa o react
import React from 'react';
//Importa os componentes do react6 native
import { View, TouchableOpacity } from 'react-native';
//Importa a biblioteca de icones
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';

export const Return = ({ style, onPress }) => {
  const theme = useTheme();
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress}>
        {/* Ícone para voltar */}
        <AntDesign name="left" size={30} color={theme.text} />
      </TouchableOpacity>
    </View>
  )
}