import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'

export const checkIfRouteExists = async (motoristaId) => {
  const ref = collection(db, 'rotas')
  const q = query(ref, where('motoristaId', '==', motoristaId))

  const snap = await getDocs(q)

  if (snap.empty) return null

  const doc = snap.docs[0]
  return { id: doc.id, ...doc.data() }
}
