import React, { createContext, useContext, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

// Cria um contexto para o usuário
const UserContext = createContext(null)

// Provedor de contexto para gerenciar o estado do usuário
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Função para autenticar o usuário no Firebase
  const login = async (phone, password) => {
    try {
      // Buscar na coleção "motoristas"
      const motoristaRef = collection(db, 'motoristas')
      const motoristaQuery = query(motoristaRef, where('phone', '==', phone))
      const motoristaSnapshot = await getDocs(motoristaQuery)

      // Buscar na coleção "responsaveis"
      const responsavelRef = collection(db, 'responsaveis')
      const responsavelQuery = query(
        responsavelRef,
        where('phone', '==', phone)
      )
      const responsavelSnapshot = await getDocs(responsavelQuery)

      // Verifica se encontrou o motorista e se a senha está correta
      if (!motoristaSnapshot.empty) {
        const motoristaData = motoristaSnapshot.docs[0].data()
        const motoristaId = motoristaSnapshot.docs[0].id // Pega o ID do motorista
        if (motoristaData.senha === password) {
          setUser({ ...motoristaData, id: motoristaId }) // Armazena os dados do motorista com o ID
          return
        }
      }

      // Verifica se encontrou o responsável e se a senha está correta
      if (!responsavelSnapshot.empty) {
        const responsavelData = responsavelSnapshot.docs[0].data()
        const responsavelId = responsavelSnapshot.docs[0].id // Pega o ID do responsável
        if (responsavelData.senha === password) {
          setUser({ ...responsavelData, id: responsavelId }) // Armazena os dados do responsável com o ID
          return
        }
      }

      // Se não encontrar o usuário ou a senha estiver errada
      throw new Error('Número de telefone ou senha incorretos.')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw new Error('Credenciais inválidas')
    }
  }

  // Função para deslogar o usuário
  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Erro ao deslogar:', error)
    }
  }

  // Monitorando o estado de autenticação para persistir o login
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false) // Para indicar que a verificação de estado foi concluída
    })

    return unsubscribe
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {!loading && children}
    </UserContext.Provider>
  )
}

// Hook personalizado para acessar os dados do usuário em outros componentes
export const useUser = () => {
  return useContext(UserContext)
}
