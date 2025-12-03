import React, { useEffect, useState } from 'react'
import { Button, Header, CustomText } from '../../components'
import { Container, Info, ProfileImage, ButtonsWrapper, styles } from './styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../../database'
import { getChatId } from '../../utils/chatUtils'

export const PerfilSearch = ({ route }) => {
  const { profile } = route.params
  const theme = useTheme()
  const navigation = useNavigation()
  const { user } = useUser()

  return (
    <Container
      contentContainerStyle={{ paddingBottom: 10 }}
      keyboardShouldPersistTaps="handled"
    >
      <Header
        bgColor="background"
        txtColor="text"
        color="text"
        showTitle={true}
        logoSource={require('../../../assets/Logo_ViaScholae.png')}
        logoSize={50}
        height="100"
        mb="40"
        size={40}
      />

      <ProfileImage source={{ uri: profile.profileImageUrl }} />

      <Info>
        <CustomText ft="24" txtColor="white">
          Nome: {profile.username}
        </CustomText>
        <CustomText ft="24" txtColor="white">
          Contato: {profile.phone}
        </CustomText>
      </Info>

      <ButtonsWrapper>
        <Button
          title="Mensagem"
          txtColor="text"
          pd={10}
          br={20}
          width="65%"
          height={50}
          ft={20}
          fw="bold"
          onPress={() => {
            const profileId = profile.uid || profile.id || profile.userId
            const currentUserId = user.uid || user.id || user.userId

            if (!profileId || !currentUserId) {
              console.error('IDs não encontrados!')
              return
            }

            let motoristaId, responsavelId

            if (profile.type === 'motorista') {
              motoristaId = `motorista_${profileId}`
              responsavelId = `responsavel_${currentUserId}`
            } else if (profile.type === 'responsavel') {
              motoristaId = `motorista_${currentUserId}`
              responsavelId = `responsavel_${profileId}`
            } else {
              motoristaId = `motorista_${currentUserId}`
              responsavelId = `responsavel_${profileId}`
            }

            const chatId = [motoristaId, responsavelId].sort().join('_')

            console.log('Chat ID gerado:', chatId)

            try {
              const chatId = getChatId(user, profile)

              navigation.navigate('Message', {
                profile: profile,
                user: user,
                chatId: chatId,
              })
            } catch (error) {
              console.error('Erro ao criar chat:', error)
              alert('Erro ao abrir conversa')
            }
          }}
        ></Button>
        {profile.type === 'responsavel' && (
          <Button
            title="Crianças"
            txtColor="text"
            pd={10}
            br={20}
            width="65%"
            height={50}
            ft={20}
            fw="bold"
            onPress={() =>
              navigation.navigate('ExibirCriancas', {
                responsavelId: profile.id,
                responsavelName: profile.username,
              })
            }
            icon={<Ionicons name="people" size={35} color="text" />}
          />
        )}
        {profile.type === 'motorista' && (
          <>
            <Button
              title="Rotas"
              txtColor="text"
              pd={10}
              br={20}
              width="65%"
              height={50}
              ft={20}
              fw="bold"
              onPress={() =>
                navigation.navigate('ManageRoute', {
                  motoristaId: profile.id,
                  motoristaName: profile.username,
                })
              }
              icon={<Ionicons name="map" size={25} color="text" />}
            />
            <Button
              title="Monitores"
              txtColor="text"
              pd={10}
              br={20}
              width="65%"
              height={50}
              ft={20}
              fw="bold"
              icon={<Ionicons name="person" size={25} color="text" />}
            />
          </>
        )}
      </ButtonsWrapper>
    </Container>
  )
}
