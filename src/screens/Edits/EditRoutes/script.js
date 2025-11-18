import { db } from '../../../config/firebase'
import { doc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'

export const updateRouteData = async ({
  rotaId,
  startPoint,
  cepStart,
  endPoint,
  cepEnd,
  nameSchool,
  numberSchool,
  region,
  startCoord,
  endCoord,
  routeCoords,
  navigation
}) => {
  try {
    // Ajusta coordenadas pro formato do Firestore
    const fixedRouteCoords = {
      ...routeCoords,
      coordinates: routeCoords.coordinates.map(coord => ({
        lng: coord[0],
        lat: coord[1],
      })),
    }

    await updateDoc(doc(db, 'rotas', rotaId), {
      startPoint,
      cepStart,
      startCoord,
      endPoint,
      cepEnd,
      endCoord,
      nameSchool,
      numberSchool,
      region,
      routeCoords: fixedRouteCoords,
    })

    alert("Rota atualizada com sucesso!")
    navigation.goBack()

  } catch (error) {
    console.error('Erro ao atualizar rota:', error)
    alert("Erro ao salvar alterações.")
  }
}

export const solicitarVaga = async (dados) => {
  return await addDoc(collection(db, "VagasSolicitadas"), {
    ...dados,
    status: "pendente",
  })
}