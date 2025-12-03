import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../../config/firebase'

export function subscribeMessages(chatId, onMessagesReceived) {
  const messagesRef = collection(db, 'Conversas', chatId, 'mensagens')
  const q = query(messagesRef, orderBy('createdAt', 'desc'))

  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        _id: doc.id,
        createdAt: data.createdAt.toDate(),
        text: data.text,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || data.user.profileImageUrl || '',
        },
      }
    })
    onMessagesReceived(msgs)
  })
}

export async function sendMessage(chatId, message, user, profile) {
  try {
    if (!chatId || chatId.includes('undefined')) {
      console.error('Chat ID inválido:', chatId)
      throw new Error('ID do chat inválido')
    }

    const messagesRef = collection(db, 'Conversas', chatId, 'mensagens')
    const conversationRef = doc(db, 'Conversas', chatId)

    const lastMessageData = {
      text: message.text,
      createdAt: new Date(),
      senderId: user.uid || user.id,
      senderName: user.username,
    }

    const participants = {
      [user.uid || user.id]: {
        id: user.uid || user.id,
        name: user.username,
        type: user.type,
        profileImageUrl: user.profileImageUrl,
        lastSeen: new Date(),
      },
      [profile.uid || profile.id]: {
        id: profile.uid || profile.id,
        name: profile.username,
        type: profile.type,
        profileImageUrl: profile.profileImageUrl,
        lastSeen: new Date(),
      },
    }

    await setDoc(
      conversationRef,
      {
        chatId: chatId,
        participants: participants,
        lastMessage: lastMessageData,
        updatedAt: new Date(),
        users: [user.uid || user.id, profile.uid || profile.id],
      },
      { merge: true }
    )
    await addDoc(messagesRef, {
      ...message,
      recipientId: profile.uid || profile.id,
      senderId: user.uid || user.id,
      createdAt: new Date(),
    })
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    throw error
  }
}
