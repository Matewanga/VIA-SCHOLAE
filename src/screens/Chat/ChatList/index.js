import React, { useState, useEffect } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../../config/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import {
  Container,
  ChatItem,
  ChatContent,
  ChatTextContainer,
  ChatName,
  ChatMessage,
} from './styles'
import { useUser } from '../../../database'

export const Chat = () => {
  const { user } = useUser()
  const navigation = useNavigation()
  const [chatList, setChatList] = useState([])

  useEffect(() => {
    async function fetchChats() {
      const chatsRef = collection(db, 'Conversas')
      const q = query(chatsRef, where('users', 'array-contains', user.uid))
      const querySnapshot = await getDocs(q)

      const chats = querySnapshot.docs.map(doc => {
        const data = doc.data()

        // Pega o UID do outro usuário (que não é o seu)
        const otherUserId = data.users.find(uid => uid !== user.uid)

        // Pega os dados desse outro usuário
        const otherUserData = data.userData?.[otherUserId] || {}

        return {
          chatId: doc.id,
          name: otherUserData.name || 'Sem nome',
          lastMessage: data.lastMessage?.text || 'Sem mensagens',
          profilePic: otherUserData.avatar || null,
        }
      })

      setChatList(chats)
    }

    fetchChats()
  }, [user.uid])

  const openChat = (chatId, name, profilePic) => {
    navigation.navigate('Message', {
      chatId,
      profile: { username: name, profileImageUrl: profilePic }
    })
  }

  return (
    <Container>
      <FlatList
        data={chatList}
        keyExtractor={(item) => item.chatId}
        renderItem={({ item }) => (
          <ChatItem onPress={() => openChat(item.chatId, item.name, item.profilePic)}>
            <ChatContent>
              <ChatTextContainer>
                <ChatName>{item.name}</ChatName>
                <ChatMessage numberOfLines={1}>{item.lastMessage}</ChatMessage>
              </ChatTextContainer>
            </ChatContent>
          </ChatItem>
        )}
      />
    </Container>
  )
}
