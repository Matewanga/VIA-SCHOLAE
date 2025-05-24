import React, { useState } from 'react'
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { useUser } from '../../../database'
import { View, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import AntDesign from '@expo/vector-icons/AntDesign'
import {
  Container,
  Header,
  Check,
  Form,
  TitleText,
  Label,
  Input,
} from './styles'

export const EditName = () => {
  const navigation = useNavigation()
  const { user, setUser } = useUser()
  const [ newUsername, setNewName] = useState(user ? user.username : '')
  const theme = useTheme()

  if (!user) {
    Alert.alert('Erro', 'Usuário não autenticado.');
    return;
  }

  // Função para atualizar o nome no Firebase
  const handleUpdateName = async () => {
    if (!newUsername) {
      Alert.alert('Erro', 'O nome não pode estar vazio.')
      return
    }

    try {
      // Identifica a coleção baseada no tipo de usuário
      const userCollection = user.type === 'motorista' ? 'motoristas' : 'responsaveis'

      const q = query(collection(db, userCollection), where('phone', '==', user.phone))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].ref
        await updateDoc(userDoc, { username: newUsername })
        console.log("Nome atualizado no Firebase")


        setUser(prevUser => ({ ...prevUser, username: newUsername }));

        const updatedQuerySnapshot = await getDocs(q);
        if (!updatedQuerySnapshot.empty) {
          const updatedUserDoc = updatedQuerySnapshot.docs[0].data();
          setUser({ ...user, username: updatedUserDoc.username });
        }

        Alert.alert('Sucesso', 'Nome atualizado com sucesso!')

        navigation.navigate('EditProfile')
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.')
      }
    } catch (error) {
      console.error('Erro ao atualizar nome: ', error)
      Alert.alert('Erro', 'Houve um erro ao atualizar o nome.')
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

        <TitleText>Nome</TitleText>

        <Check>
          <TouchableOpacity onPress={handleUpdateName}>
            <AntDesign name="check" size={30} color="#D2A236" />
          </TouchableOpacity>
        </Check>
      </Header>

      <Form>
        <Label>Nome</Label>
        <Input
          value={newUsername}
          onChangeText={setNewName}
          placeholder="Digite seu novo nome"
        />
      </Form>
    </Container>
  )
}
