//importa o react
import React from 'react'
//importa os componenets do react native
import { Image, StyleSheet } from 'react-native'
//importa a logo
import Logo_ViaScholae from '../../../../assets/Logo_ViaScholae.png'

// Componente da Logo personalizada
export const CustomLogo = ({ style }) => {
  return (
    // Cria uma Image com o estilo de linha predefinido e combina com o estilo passado via props
    <Image style={[styles.img, style]} source={Logo_ViaScholae} />
  )
}

const styles = StyleSheet.create({
  //Estilização para a imagem (Logo)
  img: {
    width: 350, //Define a largura da imagem
    height: 350, //Define a altura da imagem
  },
})
