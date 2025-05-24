import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BtnProfile, ProfileInfo, ProfileName, ProfilePhone, ProfileEmail } from './styles'
import { ProfilePic } from '../../../components'
import { Ionicons } from '@expo/vector-icons'
import { useUser } from '../../../database';
import { useTheme } from 'styled-components/native';

export const ButtonProfile = () => {
  const navigation = useNavigation()
  const { user } = useUser()
  const theme = useTheme();
  return (
    <BtnProfile onPress={() => navigation.navigate('EditProfile')}>
      <ProfilePic style={styles.profileImagePlaceholder} />
      <ProfileInfo>
        <ProfileName>{user ? user.username : 'Nome não disponível'}</ProfileName>
        <ProfilePhone>{user ? user.phone : 'Número não disponível'}</ProfilePhone>
        <ProfileEmail>{user ? user.email : 'Email não disponível'}</ProfileEmail>
      </ProfileInfo>
      <Ionicons name="chevron-forward-outline" size={24} color={theme.gray} />
    </BtnProfile>
  )
};

const styles = StyleSheet.create({
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#c4c4c4',
    borderRadius: 40,
    marginRight: 15,
  },
})