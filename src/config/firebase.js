import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'

// Configurações do Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAL-AM9mJ6HUSeEEb6YVrkBWnWjv9sVAf0',
  authDomain: 'via-scholae.firebaseapp.com',
  projectId: 'via-scholae',
  storageBucket: 'via-scholae.firebasestorage.app',
  messagingSenderId: '954200156503',
  appId: '1:954200156503:web:69744a77501bd8ec2db612',
  measurementId: 'G-5J7DBYSZ2B',
}

// Inicializa o Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

// Inicializa auth somente se ainda não foi inicializado
const db = getFirestore(app)
const storage = getStorage(app)

// Analytics (opcional)
let analytics
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app)
    console.log('Firebase Analytics inicializado.')
  } else {
    console.warn('Firebase Analytics não é suportado nesse ambiente.')
  }
})

export { app, auth, db, storage }

