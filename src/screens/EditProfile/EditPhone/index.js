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

export const EditPhone = () => {
  const navigation = useNavigation()
  const { user, setUser } = useUser()
  const db = useDatabase()
  const [newPhone, setNewPhone] = useState(user ? user.phone : '')
  const theme = useTheme();

  const handleUpdatePhone = async () => {
    if (!newPhone) {
      Alert.alert('Erro', 'O número de telefone não pode estar vazio.')
      return
    }
    try {
      const table = user.type === 'motorista' ? 'Motorista' : 'Responsavel'
      await db.runAsync(`UPDATE ${table} SET phone = ? WHERE phone = ?`, [
        newPhone,
        user.phone,
      ])
      setUser({ ...user, phone: newPhone })
      Alert.alert('Sucesso', 'Número de telefone atualizado com sucesso!')
      navigation.navigate('EditProfile')
    } catch (error) {
      console.error('Erro ao atualizar o número de telefone: ', error)
      Alert.alert('Erro', 'Houve um erro ao atualizar o número de telefone.')
    }
  }

  return (
    <Container>
      <Header>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <AntDesign name="left" size={30} color={theme.text} />
          </TouchableOpacity>
        </View>
        <TitleText>Telefone</TitleText>
        <Check>
          <TouchableOpacity onPress={handleUpdatePhone}>
            <AntDesign name="check" size={30} color="#D2A236" />
          </TouchableOpacity>
        </Check>
      </Header>
      <Form>
        <Label>Telefone</Label>
        <Input
          value={newPhone}
          onChangeText={setNewPhone}
          placeholder="Digite seu novo número de telefone"
          keyboardType="phone-pad"
          maxLength={13}
        />
      </Form>
    </Container>
  )
}
