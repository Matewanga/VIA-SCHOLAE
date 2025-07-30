import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GiftedChat, Avatar } from 'react-native-gifted-chat'
import {
  Container,
  HeaderContainer,
  LeftBox,
  BackButton,
  UserAvatar,
  UserName,
  renderCustomBubble,
  renderCustomInputToolbar,
  renderCustomSend,
} from './styles'
import { useUser } from '../../../database'
import { sendMessage, subscribeMessages } from './script'
import Icon from 'react-native-vector-icons/Ionicons'

export const Message = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { profile, chatId } = route.params
  const { user } = useUser()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const unsubscribe = subscribeMessages(chatId, (msgs) => {
      setMessages(msgs)
    })
    return () => unsubscribe()
  }, [chatId])

  const mensagemEnviada = useCallback(
    async (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      )

      const { _id, createdAt, text } = messages[0]

      const msgToSend = {
        _id,
        createdAt,
        text,
        user: {
          _id: user.uid,
          name: user.username,
          avatar: user.profileImageUrl,
        },
      }

      try {
        // Passa o perfil do outro usuário para atualizar o chat corretamente
        await sendMessage(chatId, msgToSend, user, profile)
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error)
      }
    },
    [chatId, user, profile]
  )

  return (
    <Container>
      <HeaderContainer>
        <LeftBox>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={40} color="#fff" />
          </BackButton>

          <UserAvatar source={{ uri: profile.profileImageUrl }} />

          <UserName>{profile.username}</UserName>
        </LeftBox>
      </HeaderContainer>

      <GiftedChat
        messages={messages}
        onSend={(msg) => mensagemEnviada(msg)}
        user={{
          _id: user.uid,
          name: user.username,
          avatar: user.avatar || user.profileImageUrl,
        }}
        renderBubble={renderCustomBubble}
        renderInputToolbar={renderCustomInputToolbar}
        renderSend={renderCustomSend}
        renderAvatar={(props) => (
          <Avatar
            {...props}
            imageStyle={{
              left: { width: 36, height: 36, borderRadius: 18, marginRight: 2 },
              right: { width: 36, height: 36, borderRadius: 18, marginLeft: 2 },
            }}
          />
        )}
        renderAvatarOnTop={true}
        showAvatarForEveryMessage={true}
      />
    </Container>
  )
}
