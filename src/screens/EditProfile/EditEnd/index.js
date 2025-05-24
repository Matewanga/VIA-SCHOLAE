import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import {
  Container,
  Header,
  Check,
  Form,
  TitleText,
  Label,
  Input,
} from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useDatabase, useUser } from '../../../database';
import { useTheme } from 'styled-components/native';

export const EditEnd = () => {
  const navigation = useNavigation();
  const { user, setUser } = useUser();
  const db = useDatabase();
  const [newEnd, setNewEnd] = useState(user ? user.end : '');
  const [newCEP, setNewCEP] = useState(user ? user.cep : '');
  const theme = useTheme();

  const handleGetAddress = async (cep) => {
    if (cep.length !== 8) {
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, localidade, uf } = response.data;

      if (logradouro) {
        setNewEnd(`${logradouro}, ${localidade} - ${uf}`);
      } else {
        Alert.alert('Erro', 'CEP não encontrado');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar o endereço');
    }
  };

  useEffect(() => {
    if (newCEP.length === 8) {
      handleGetAddress(newCEP);
    }
  }, [newCEP]);

  const handleUpdateEnd = async () => {
    if (!newEnd || !newCEP) {
      Alert.alert('Erro', 'Endereço e CEP não podem estar vazios.');
      return;
    }

    try {
      const table = user.type === 'motorista' ? 'Motorista' : 'Responsavel';
      const result = await db.runAsync(`UPDATE ${table} SET end = ?, cep = ? WHERE id = ?`, [
        newEnd,
        newCEP,
        user.id,
      ]);

      if (result.changes === 0) {
        Alert.alert('Erro', 'Nenhuma mudança foi feita. Verifique os dados.');
        return;
      }

      setUser(prevUser => ({ ...prevUser, end: newEnd, cep: newCEP }));
      Alert.alert('Sucesso', 'Endereço atualizado com sucesso!');
      navigation.navigate('EditProfile');
    } catch (error) {
      console.error('Erro ao atualizar o endereço: ', error);
      Alert.alert('Erro', 'Houve um erro ao atualizar o endereço.');
    }
  };

  return (
    <Container>
      <Header>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <AntDesign name="left" size={30} color={theme.text} />
          </TouchableOpacity>
        </View>
        <TitleText>Endereço</TitleText>
        <Check>
          <TouchableOpacity onPress={handleUpdateEnd}>
            <AntDesign name="check" size={30} color="#D2A236" />
          </TouchableOpacity>
        </Check>
      </Header>

      <Form>
        <Label>Endereço</Label>
        <Input
          value={newEnd}
          onChangeText={setNewEnd}
          placeholder="Digite seu novo endereço"
        />
        <Label>CEP</Label>
        <Input
          value={newCEP}
          onChangeText={setNewCEP}
          placeholder="Digite seu novo CEP"
          keyboardType="phone-pad"
          maxLength={8}
        />
      </Form>
    </Container>
  );
};
