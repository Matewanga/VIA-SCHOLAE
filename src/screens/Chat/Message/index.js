import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Text, TouchableOpacity } from 'react-native'
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { Return, ProfilePic } from '../../../components'
import {
  styles,
  Container,
  Header,
  Name,
  SubTitles,
  HeaderInfo,
  renderCustomBubble,
  renderCustomInputToolbar,
  renderCustomSend,
} from './styles'
import { useUser } from '../../../database'

export const Message = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { profile, chatId } = route.params
  const { user } = useUser()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    async function getMessages() {
      // Agora as mensagens são obtidas da subcoleção "mensagens" dentro de um chat específico
      const messagesRef = collection(db, 'Conversas', chatId, 'mensagens')
      const q = query(messagesRef, orderBy('createdAt', 'desc'))

      onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      })
    }
    getMessages()
  }, [chatId]) // Dependência de chatId, para buscar as mensagens de um chat específico

  const mensagemEnviada = useCallback(
    (messages = []) => {
      setMessages((previousMessages) => {
        GiftedChat.append(previousMessages, messages)
      })

      const { _id, createdAt, text, user } = messages[0]

      // Adiciona a mensagem à subcoleção "mensagens" dentro do chat específico
      addDoc(collection(db, 'Conversas', chatId, 'mensagens'), {
        _id,
        createdAt,
        text,
        user,
      })
    },
    [chatId] // O chatId é a chave para a subcoleção de mensagens
  )

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.navigate('Mensagens')}>
          <Return style={styles.back} />
        </TouchableOpacity>
        <ProfilePic style={styles.pic} />
        <HeaderInfo>
          <Name>
            <Text>{profile.username}</Text>
          </Name>
          <SubTitles>
            <Text>{profile.phone}</Text>
          </SubTitles>
        </HeaderInfo>
      </Header>

      <GiftedChat
        messages={messages}
        onSend={(msg) => mensagemEnviada(msg)}
        user={{
          _id: user.id,
          name: user.username,
          avatar: user.avatar || '',
        }}
        renderBubble={renderCustomBubble}
        renderInputToolbar={renderCustomInputToolbar}
        renderSend={renderCustomSend}
      />
    </Container>
  )
}
