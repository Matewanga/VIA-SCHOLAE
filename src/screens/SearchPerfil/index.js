import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import {
  ProfilePic,
  ButtonMessage,
} from '../../components'
import {
  Container,
  Header,
  ProfileContainer,
  ConProfilePic,
  ProfileName,
  SubTitles,
  CloseButton,
  ButtonContainer,
  UserAvatar,
  styles,
} from './styles'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../../database'

export const PerfilSearch = ({ route }) => {
  const { profile } = route.params
  const theme = useTheme()
  const navigation = useNavigation()
  const { user } = useUser()

  return (
    <Container>
      <Header>
        <CloseButton onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={35} color={theme.text} />
        </CloseButton>
      </Header>

      <ProfileContainer>
        <ConProfilePic>
          <UserAvatar source={{ uri: profile.profileImageUrl }} resizeMode="cover" />
        </ConProfilePic>

        <ProfileName>{profile.username}</ProfileName>
        <SubTitles>
          <Text>{profile.email}</Text>
        </SubTitles>
        <SubTitles>
          <Text>{profile.phone}</Text>
        </SubTitles>

      </ProfileContainer>

      <ButtonContainer>
        {/* {profile.type === 'responsavel' && <ButtonChildren />}
        {profile.type === 'motorista' && (
          <BtnRotas
            onPress={() =>
              navigation.navigate('ExibirRota', { motoristaId: profile.id })
            }
          />
        )} */}
      </ButtonContainer>

      <ButtonMessage
        onPress={() => {
          // Criar identificadores únicos para o chat
          const motoristaId =
            profile.type === 'motorista'
              ? `motorista_${profile.id}`
              : `motorista_${user.id}`
          const responsavelId =
            profile.type === 'responsavel'
              ? `responsavel_${profile.id}`
              : `responsavel_${user.id}`

          // Garantir um ID único e consistente para o chat
          const chatId = [motoristaId, responsavelId].sort().join('_')

          // Navegar para a tela de mensagens
          navigation.navigate('Message', {
            profile: profile,
            user: user,
            chatId: chatId,
          })
        }}
      >
        Mensagem
      </ButtonMessage>
    </Container>
  )
}
