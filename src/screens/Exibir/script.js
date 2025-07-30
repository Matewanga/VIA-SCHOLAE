import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'

// Função para buscar as crianças do responsável
export async function fetchCriancasDoResponsavel(responsavelId) {
  try {
    const q = query(collection(db, 'criancas'), where('responsavelId', '==', responsavelId))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erro ao buscar crianças:', error)
    throw error
  }
}