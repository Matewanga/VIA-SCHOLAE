import React, { useState } from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import {
  Container,
  Header,
  Check,
  Form,
  TitleText,
  Label,
  Input,
} from './styles'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { useDatabase, useUser } from '../../../database'
import { useTheme } from 'styled-components/native';

export const EditEmail = () => {
  const navigation = useNavigation()
  const { user, setUser } = useUser() // Acesse os dados do usuário e a função para atualizar o contexto
  const db = useDatabase() // Acesse a instância do banco de dados
  const [newEmail, setNewEmail] = useState(user ? user.email : '') // Estado local para o e-mail
  const theme = useTheme();

  // Função para atualizar o e-mail no banco de dados
  const handleUpdateEmail = async () => {
    if (!newEmail) {
      Alert.alert('Erro', 'O e-mail não pode estar vazio.')
      return
    }

    try {
      // Verifica se o usuário é um responsável ou motorista
      const table = user.type === 'motorista' ? 'Motorista' : 'Responsavel'

      // Atualize o e-mail na tabela correta (Responsavel ou Motorista)
      await db.runAsync(`UPDATE ${table} SET email = ? WHERE email = ?`, [
        newEmail,
        user.email,
      ])

      // Atualize os dados do usuário no contexto
      setUser({ ...user, email: newEmail })

      Alert.alert('Sucesso', 'E-mail atualizado com sucesso!')

      // Navegue de volta para a tela de perfil
      navigation.navigate('EditProfile')
    } catch (error) {
      console.error('Erro ao atualizar o e-mail: ', error)
      Alert.alert('Erro', 'Houve um erro ao atualizar o e-mail.')
    }
  }

  return (
    <Container>
      {/* Header da tela */}
      <Header>
        {/* Botão de retorno */}
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <AntDesign name="left" size={30} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Título da tela */}
        <TitleText>E-mail</TitleText>

        {/* Botão de confirmação */}
        <Check>
          <TouchableOpacity onPress={handleUpdateEmail}>
            <AntDesign name="check" size={30} color="#D2A236" />
          </TouchableOpacity>
        </Check>
      </Header>

      {/* Formulário de edição de e-mail */}
      <Form>
        <Label>E-mail</Label>
        <Input
          value={newEmail}
          onChangeText={setNewEmail} // Atualiza o estado com o novo e-mail
          placeholder="Digite seu novo e-mail"
          keyboardType="email-address"
        />
      </Form>
    </Container>
  )
}
