import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Header, CustomText, Button } from '../../components'
import { Container } from './styles'

export const Acessibility = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Container
        contentContainerStyle={{ paddingBottom: 10 }}
        keyboardShouldPersistTaps="handled"
      >
        <Header bgColor="darkblue" txtColor="white" color="white" size={40}>
          Acessibilidade
        </Header>
      </Container>
    </KeyboardAvoidingView>
  )
}
