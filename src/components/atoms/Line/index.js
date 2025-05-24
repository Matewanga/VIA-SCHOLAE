//imporrta o react
import React from 'react'
//importa os componentes do react native
import { View, StyleSheet } from 'react-native'

// Componente de linha personalizada
export const Line = ({ style }) => {
  return (
    // Cria uma View com o estilo de linha predefinido e combina com o estilo passado via props
    <View style={[styles.line, style]}></View>
  )
}

const styles = StyleSheet.create({
  line: {
    height: 2, //Espressura da linha
    backgroundColor: '#E9B224', //Cor da linha
  },
})
