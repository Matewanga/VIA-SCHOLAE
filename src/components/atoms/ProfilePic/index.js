// ProfilePic.js
import React from 'react'
import { Image, StyleSheet } from 'react-native'

export const ProfilePic = ({ uri, style }) => {
  // Retorna um elemento Image que exibe a foto do usuário
  return (
    <Image
      style={[styles.profilePic, style]}
      source={uri ? { uri } : require('../../../../assets/Foto-User-teste.jpg')}
    />
  )
}

const styles = StyleSheet.create({
  profilePic: {
    width: 150, // Largura da imagem
    height: 150, // Altura da imagem
    borderRadius: 100, // Arredonda os cantos para criar um efeito circular
    marginBottom: 10, // Espaçamento abaixo da imagem
    resizeMode: 'cover', // Garante que a imagem preencha o círculo mantendo a proporção
  },
})
