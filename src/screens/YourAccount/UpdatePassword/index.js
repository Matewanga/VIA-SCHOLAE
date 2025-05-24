import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Return, ButtonAtualizar } from '../../../components'
import {
  styles,
  Container,
  Header,
  Form,
  Input,
  TitleText,
  Label,
} from './styles'
import { useUser } from '../../../database' // Importando apenas useUser

import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'

export const UpdatePassword = () => {
  const navigation = useNavigation()
  const { user } = useUser() // Acesse os dados do usuário
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confSenha, setConfSenha] = useState('')

  const handleUpdatePassword = async () => {
    if (senhaAtual === '' || novaSenha === '' || confSenha === '') {
      Alert.alert('', 'Preencha todos os campos')
      return
    }

    if (novaSenha !== confSenha) {
      Alert.alert('Erro', 'As novas senhas não coincidem')
      return
    }

    try {
      if (!user || !user.id || !user.senha) {
        Alert.alert('Erro', 'Dados de usuário ausentes ou inválidos')
        return
      }

      // Obter o Firestore
      const db = getFirestore()

      // Referência do usuário na coleção correta (Responsaveis ou Motoristas)
      const userRef = doc(
        db,
        user.type === 'responsavel' ? 'responsaveis' : 'motoristas',
        user.id
      )

      // Obter dados do usuário para verificar a senha atual
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        Alert.alert('Erro', 'Usuário não encontrado')
        return
      }

      const userData = userDoc.data()

      // Verificar se a senha atual está correta
      if (userData.senha !== senhaAtual) {
        Alert.alert('Erro', 'A senha atual está incorreta')
        return
      }

      // Atualizar a senha no Firestore
      await updateDoc(userRef, {
        senha: novaSenha,
      })

      // Se a atualização foi bem-sucedida
      Alert.alert('Sucesso', 'Senha atualizada com sucesso!')
      navigation.navigate('YourAccount')
    } catch (error) {
      console.error('Erro ao atualizar a senha: ', error)
      Alert.alert('Erro', 'Houve um erro ao atualizar a senha.')
    }
  }

  return (
    <Container>
      <Header>
        <Return
          style={styles.back}
          onPress={() => navigation.navigate('YourAccount')}
        />
        <TitleText>Atualize sua senha</TitleText>
      </Header>

      <Form>
        <Label>Digite sua senha atual</Label>
        <Input
          placeholder="Insira sua senha atual"
          secureTextEntry
          value={senhaAtual}
          onChangeText={setSenhaAtual}
        />

        <Label>Digite uma nova senha</Label>
        <Input
          placeholder="Digite uma nova senha"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
        />

        <Label>Confirme sua senha</Label>
        <Input
          placeholder="Confirme sua senha"
          secureTextEntry
          value={confSenha}
          onChangeText={setConfSenha}
        />

        <ButtonAtualizar onPress={handleUpdatePassword} />
      </Form>
    </Container>
  )
}
