import React, { useState, useEffect } from 'react'
import { FlatList, Text } from 'react-native'
import { ProfilePic } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../config/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore'
import {
  styles,
  Container,
  SearchContainer,
  ChatContent,
  ChatTextContainer,
  ChatName,
  ChatMessage,
  Input,
  TitleText,
  ChatItem,
} from './styles'
import { useUser } from '../../database'

export const Chat = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [chatList, setChatList] = useState([]) // Lista de chats
  const { user } = useUser() // Usuário logado
  const navigation = useNavigation()

  // Função para buscar as conversas do usuário logado
  useEffect(() => {
    const fetchChats = async () => {
      const chatsRef = collection(db, 'Conversas') // Ref para a coleção 'Conversas'

      // Busca todas as conversas onde o usuário logado é parte (busca pelo ID do usuário no chatId)
      const q = query(
        chatsRef,
        where('users', 'array-contains', user.id) // Certifica que o usuário está na conversa
      )

      // Obtém todos os chats
      const querySnapshot = await getDocs(q)

      const chats = []

      for (const docSnap of querySnapshot.docs) {
        const chatData = docSnap.data()

        // Pega a última mensagem dessa conversa
        const mensagensRef = collection(docSnap.ref, 'mensagens')
        const mensagensSnapshot = await getDocs(mensagensRef)
        const lastMessageDoc =
          mensagensSnapshot.docs[mensagensSnapshot.docs.length - 1]

        chats.push({
          chatId: docSnap.id, // ID da conversa
          name: chatData.name, // Nome da conversa
          lastMessage: lastMessageDoc
            ? lastMessageDoc.data().text
            : 'Sem mensagens', // Última mensagem
          profilePic: chatData.profilePic || null, // Imagem de perfil da conversa, se houver
        })
      }

      setChatList(chats) // Atualiza a lista de chats
    }

    fetchChats() // Chama a função para buscar os chats

    // Limpeza do efeito
    return () => {
      // Aqui não precisamos fazer nada porque não estamos ouvindo mudanças em tempo real
    }
  }, [user.id]) // Reexecuta quando o usuário logado mudar

  // Filtra os chats com base no texto de pesquisa
  const filteredChats = chatList.filter(
    (chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filtra pelo nome
  )

  // Função para abrir o chat
  const openChat = (chatId) => {
    navigation.navigate('Message', { chatId }) // Navega para a tela de mensagens passando o chatId
  }

  return (
    <Container>
      <TitleText>Chats</TitleText>

      <SearchContainer>
        <Input
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Atualiza a busca
        />
      </SearchContainer>

      <FlatList
        data={filteredChats} // Exibe os chats filtrados
        keyExtractor={(item) => item.chatId} // Usa o chatId como chave única
        renderItem={({ item }) => (
          <ChatItem onPress={() => openChat(item.chatId)}>
            <ChatContent>
              <ProfilePic style={styles.pic} />
              <ChatTextContainer>
                <ChatName>{item.name}</ChatName>
                <ChatMessage>{item.lastMessage}</ChatMessage> // Exibe a última
                mensagem
              </ChatTextContainer>
            </ChatContent>
          </ChatItem>
        )}
      />
    </Container>
  )
}
