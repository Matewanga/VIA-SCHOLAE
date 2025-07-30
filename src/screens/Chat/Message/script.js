import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../../config/firebase'

// Função para escutar mensagens de um chat e disparar callback com as mensagens formatadas
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
          avatar: data.user.avatar || data.user.profileImageUrl || '', // <- aqui está o segredo
        },
      }
    })
    onMessagesReceived(msgs)
  })
}

// Função para enviar uma mensagem no chat
export async function sendMessage(chatId, message) {
  const messagesRef = collection(db, 'Conversas', chatId, 'mensagens')
  await addDoc(messagesRef, message)
}
