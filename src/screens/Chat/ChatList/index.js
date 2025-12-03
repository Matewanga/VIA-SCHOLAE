import React, { useState, useEffect } from 'react'
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { db } from '../../../config/firebase'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc,
} from 'firebase/firestore'
import { useUser } from '../../../database'
import { Header } from '../../../components'
import {
  Container,
  ChatItem,
  ProfileImage,
  ChatContent,
  ChatInfo,
  ChatName,
  ChatMessage,
  ChatTime,
} from './styles'

export const Chat = () => {
  const { user } = useUser()
  const navigation = useNavigation()
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      loadChats()
    }, [user])
  )

  const loadChats = async () => {
    try {
      if (!user?.uid || !user?.type) {
        setLoading(false)
        return
      }

      const allChats = await getDocs(collection(db, 'Conversas'))

      const userChats = []
      const promises = []

      for (const chatDoc of allChats.docs) {
        const chatId = chatDoc.id

        const isUserInChat = chatId.includes(user.uid)
        if (!isUserInChat) continue

        let otherUserId = null
        let otherUserType = null

        if (user.type === 'motorista') {
          const match = chatId.match(/responsavel_([^_]+)/)
          if (match) {
            otherUserId = match[1]
            otherUserType = 'responsavel'
          }
        } else {
          const match = chatId.match(/motorista_([^_]+)/)
          if (match) {
            otherUserId = match[1]
            otherUserType = 'motorista'
          }
        }

        if (!otherUserId) continue

        promises.push(
          (async () => {
            try {
              let otherUserData = null
              let otherUserCollection =
                otherUserType === 'motorista' ? 'motoristas' : 'responsaveis'

              const userQuery = query(
                collection(db, otherUserCollection),
                where('uid', '==', otherUserId)
              )

              const userSnapshot = await getDocs(userQuery)

              if (!userSnapshot.empty) {
                otherUserData = userSnapshot.docs[0].data()
              } else {
                const userDocRef = doc(db, otherUserCollection, otherUserId)
                const userDoc = await getDoc(userDocRef)
                if (userDoc.exists()) {
                  otherUserData = userDoc.data()
                }
              }

              if (!otherUserData) {
                console.log(
                  `Usuário ${otherUserId} não encontrado em ${otherUserCollection}`
                )
                return null
              }

              let lastMessage = 'Sem mensagens'
              let lastMessageTime = null

              try {
                const msgsRef = collection(db, 'Conversas', chatId, 'mensagens')
                const msgsQuery = query(
                  msgsRef,
                  orderBy('createdAt', 'desc'),
                  limit(1)
                )
                const msgsSnap = await getDocs(msgsQuery)

                if (!msgsSnap.empty) {
                  const msgData = msgsSnap.docs[0].data()
                  lastMessage = msgData.text || 'Sem mensagens'
                  lastMessageTime = msgData.createdAt?.toDate?.() || new Date()
                }
              } catch (e) {
                console.log('Erro ao buscar mensagens:', e)
              }

              return {
                id: chatId,
                chatId,
                otherUserId,
                otherUserType,
                otherUserName:
                  otherUserData.username ||
                  otherUserData.name ||
                  `Usuário ${otherUserType}`,
                otherUserImage:
                  otherUserData.profileImageUrl ||
                  'https://via.placeholder.com/150',
                lastMessage,
                lastMessageTime,
              }
            } catch (error) {
              console.error(`Erro ao processar chat ${chatId}:`, error)
              return null
            }
          })()
        )
      }

      const chatResults = await Promise.all(promises)
      const validChats = chatResults.filter((chat) => chat !== null)

      validChats.sort((a, b) => {
        const timeA = a.lastMessageTime || new Date(0)
        const timeB = b.lastMessageTime || new Date(0)
        return timeB - timeA
      })

      setChats(validChats)
    } catch (error) {
      console.error('Erro ao carregar chats:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    loadChats()
  }

  const openChat = (chat) => {
    navigation.navigate('Message', {
      chatId: chat.chatId,
      profile: {
        id: chat.otherUserId,
        uid: chat.otherUserId,
        username: chat.otherUserName,
        type: chat.otherUserType,
        profileImageUrl: chat.otherUserImage,
      },
    })
  }

  const formatTime = (date) => {
    if (!date) return ''

    const now = new Date()
    const diffMs = now - date
    const diffHours = diffMs / (1000 * 60 * 60)

    if (diffHours < 24) {
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    } else if (diffHours < 48) {
      return 'Ontem'
    } else {
      return date.toLocaleDateString('pt-BR')
    }
  }

  if (loading) {
    return (
      <Container>
        <Header
          txtColor="white"
          bgColor="blue"
          color="white"
          size={40}
          logoSource={require('../../../../assets/Logo_ViaScholae.png')}
          logoSize={50}
        >
          Conversas
        </Header>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Container>
    )
  }

  return (
    <Container>
      <Header
        txtColor="white"
        bgColor="blue"
        color="white"
        size={40}
        logoSource={require('../../../../assets/Logo_ViaScholae.png')}
        logoSize={50}
      >
        Conversas
      </Header>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
              Nenhuma conversa encontrada{'\n'}
              <Text style={{ fontSize: 14, color: '#999' }}>
                Envie uma mensagem para iniciar uma conversa
              </Text>
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <ChatItem onPress={() => openChat(item)}>
            <ProfileImage
              source={{ uri: item.otherUserImage }}
              resizeMode="cover"
            />
            <ChatContent>
              <ChatInfo>
                <ChatName>{item.otherUserName}</ChatName>
                <ChatMessage numberOfLines={1}>{item.lastMessage}</ChatMessage>
              </ChatInfo>
              {item.lastMessageTime && (
                <ChatTime>{formatTime(item.lastMessageTime)}</ChatTime>
              )}
            </ChatContent>
          </ChatItem>
        )}
      />
    </Container>
  )
}
