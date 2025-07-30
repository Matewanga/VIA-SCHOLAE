import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'

export const SearchUsers = async (searchQuery, user) => {
  if (searchQuery.length >= 2 && user) {
    try {
      const searchCollection =
        user.type === 'motorista' ? 'responsaveis' : 'motoristas'
      const userRef = collection(db, searchCollection)

      const userQuery = query(
        userRef,
        where('username', '>=', searchQuery),
        where('username', '<=', searchQuery + '\uf8ff')
      )

      const snapshot = await getDocs(userQuery)
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return users
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      throw new Error('Houve um erro ao buscar usuários.')
    }
  }
  return []
}