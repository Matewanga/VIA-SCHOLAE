import React, { createContext, useContext, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth'

// Cria um contexto para o usuário
const UserContext = createContext(null)


// Provedor de contexto para gerenciar o estado do usuário
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshUserData = async () => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    const docResp = await getDoc(doc(db, 'responsaveis', currentUser.uid))
    if (docResp.exists()) {
      setUser({ uid: currentUser.uid, tipo: 'responsavel', ...docResp.data() })
      return
    }

    const docMotorista = await getDoc(doc(db, 'motoristas', currentUser.uid))
    if (docMotorista.exists()) {
      setUser({ uid: currentUser.uid, tipo: 'motorista', ...docMotorista.data() })
      return
    }
  }


  // Função para autenticar o usuário no Firebase
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // Tenta buscar primeiro em "responsaveis"
      const docResp = await getDoc(doc(db, 'responsaveis', user.uid))
      if (docResp.exists()) {
        setUser({ uid: user.uid, tipo: 'responsavel', ...docResp.data() })
        return
      }

      // Se não encontrou, tenta em "motoristas"
      const docMotorista = await getDoc(doc(db, 'motoristas', user.uid))
      if (docMotorista.exists()) {
        setUser({ uid: user.uid, tipo: 'motorista', ...docMotorista.data() })
        return
      }

      throw new Error('Usuário autenticado mas não encontrado no Firestore.')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw new Error('E-mail ou senha incorretos.')
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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Tenta buscar em ambas as coleções
        const docResp = await getDoc(doc(db, 'responsaveis', currentUser.uid))
        if (docResp.exists()) {
          setUser({
            uid: currentUser.uid,
            tipo: 'responsavel',
            ...docResp.data(),
          })
          setLoading(false)
          return
        }

        const docMotorista = await getDoc(
          doc(db, 'motoristas', currentUser.uid)
        )
        if (docMotorista.exists()) {
          setUser({
            uid: currentUser.uid,
            tipo: 'motorista',
            ...docMotorista.data(),
          })
          setLoading(false)
          return
        }

        // Se não encontrou o usuário nas coleções
        setUser(currentUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, refreshUserData }}>
      {!loading && children}
    </UserContext.Provider>
  )
}

// Hook personalizado para acessar os dados do usuário em outros componentes
export const useUser = () => {
  return useContext(UserContext)
}
