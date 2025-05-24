import React from 'react'
import { BtnEdit, BtnEditeText } from './styles'
import { useNavigation } from '@react-navigation/native'

export const ButtonEdit = () => {
  const navigation = useNavigation()
  return (
    <BtnEdit onPress={() => navigation.navigate('EditProfile')}>
      <BtnEditeText>Edite</BtnEditeText>
    </BtnEdit>
  );
};