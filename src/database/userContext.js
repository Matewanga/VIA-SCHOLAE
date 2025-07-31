import React, { createContext, useContext, useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth'

// Cria o contexto
const UserContext = createContext(null)

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

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      const docResp = await getDoc(doc(db, 'responsaveis', user.uid))
      if (docResp.exists()) {
        const data = { uid: user.uid, tipo: 'responsavel', ...docResp.data() }
        setUser(data)
        return data
      }

      const docMotorista = await getDoc(doc(db, 'motoristas', user.uid))
      if (docMotorista.exists()) {
        const data = { uid: user.uid, tipo: 'motorista', ...docMotorista.data() }
        setUser(data)
        return data
      }

      throw new Error('Usuário autenticado mas não encontrado no Firestore.')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw new Error('E-mail ou senha incorretos.')
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Erro ao deslogar:', error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docResp = await getDoc(doc(db, 'responsaveis', currentUser.uid))
        if (docResp.exists()) {
          setUser({ uid: currentUser.uid, tipo: 'responsavel', ...docResp.data() })
          setLoading(false)
          return
        }

        const docMotorista = await getDoc(doc(db, 'motoristas', currentUser.uid))
        if (docMotorista.exists()) {
          setUser({ uid: currentUser.uid, tipo: 'motorista', ...docMotorista.data() })
          setLoading(false)
          return
        }

        setUser(null)
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

export const useUser = () => {
  return useContext(UserContext)
}
