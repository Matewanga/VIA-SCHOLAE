import { db } from '../../config/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from 'firebase/firestore'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtZHMxYTdmNDBveHAyaXBwNmk0cGRtbDUifQ.mzr4-ccJpyUD5cH08FtGbQ'

export const buscarRotasDoMotorista = async (userId) => {
  const q = query(collection(db, 'rotas'), where('motoristaId', '==', userId))
  const snapshot = await getDocs(q)

  const todasRotas = []

  for (const rotaDoc of snapshot.docs) {
    const rotasFinaisRef = collection(db, 'rotas', rotaDoc.id, 'rotasFinais')
    const rotasFinaisSnap = await getDocs(rotasFinaisRef)

    rotasFinaisSnap.forEach((finalDoc) => {
      const rotaData = finalDoc.data()

      todasRotas.push({
        id: finalDoc.id,
        idRotaPai: rotaDoc.id,
        ...rotaData,
      })
    })
  }

  return todasRotas
}

export const getRoute = async (from, to) => {
  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${from[0]},${from[1]};${to[0]},${to[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`

    const response = await fetch(url)
    const data = await response.json()

    return data.routes[0].geometry
  } catch (e) {
    console.log('Erro ao buscar rota:', e)
    return null
  }
}

export const gerarRotaCompleta = async (pontos) => {
  const segmentos = []

  for (let i = 0; i < pontos.length - 1; i++) {
    const geom = await getRoute(pontos[i].coordinate, pontos[i + 1].coordinate)
    if (geom) {
      segmentos.push(...geom.coordinates)
    }
  }

  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: segmentos,
    },
  }
}

export const calcularCentroMapa = (rota) => {
  if (!rota?.rotaOrdenada?.pontos || rota.rotaOrdenada.pontos.length === 0) {
    return { center: [-46.6333, -23.5505], zoom: 11 }
  }

  const pts = rota.rotaOrdenada.pontos.map((p) => p.coordinate)
  const lngs = pts.map((p) => p[0])
  const lats = pts.map((p) => p[1])

  return {
    center: [
      (Math.min(...lngs) + Math.max(...lngs)) / 2,
      (Math.min(...lats) + Math.max(...lats)) / 2,
    ],
    zoom: 13,
  }
}

export async function carregarRotasFinais(idRota) {
  const db = getFirestore()
  const ref = collection(db, `rotas/${idRota}/rotasFinais`)
  const snap = await getDocs(ref)

  const rotas = snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }))
  return rotas
}

// script.js - Adicione esta nova função
export async function buscarTodasRotasFinaisDoMotorista(userId) {
  try {
    console.log('Buscando TODAS rotas finais do motorista:', userId)

    const db = getFirestore()

    // 1. Primeiro busca todas as rotas deste motorista
    const rotasRef = collection(db, 'rotas')
    const q = query(rotasRef, where('motoristaId', '==', userId))
    const rotasSnap = await getDocs(q)

    console.log('Rotas encontradas:', rotasSnap.size)

    const todasRotasFinais = []

    // 2. Para cada rota, busca suas rotas finais
    for (const rotaDoc of rotasSnap.docs) {
      try {
        console.log('Buscando rotas finais da rota:', rotaDoc.id)

        const rotasFinaisRef = collection(
          db,
          'rotas',
          rotaDoc.id,
          'rotasFinais'
        )
        const finaisSnap = await getDocs(rotasFinaisRef)

        console.log(`Rotas finais na rota ${rotaDoc.id}:`, finaisSnap.size)

        finaisSnap.forEach((finalDoc) => {
          const dados = finalDoc.data()
          todasRotasFinais.push({
            id: finalDoc.id,
            idRotaPai: rotaDoc.id,
            ...dados,
          })
        })
      } catch (error) {
        console.error(
          `Erro ao buscar rotas finais da rota ${rotaDoc.id}:`,
          error
        )
      }
    }

    console.log('Total de rotas finais coletadas:', todasRotasFinais.length)
    return todasRotasFinais
  } catch (error) {
    console.error('Erro geral ao buscar rotas finais:', error)
    return []
  }
}


export async function buscarRotasDoResponsavel(userId) {
  try {
    console.log('🔍 Buscando rotas do responsável:', userId)
    
    const db = getFirestore()
    
    const rotasRef = collection(db, 'rotas')
    const rotasSnap = await getDocs(rotasRef)
    
    console.log('📊 Total de rotas no sistema:', rotasSnap.size)
    
    const rotasDoResponsavel = []
    
    for (const rotaDoc of rotasSnap.docs) {
      try {
        const rotasFinaisRef = collection(db, 'rotas', rotaDoc.id, 'rotasFinais')
        const finaisSnap = await getDocs(rotasFinaisRef)
        
        console.log(`📁 Rotas finais na rota ${rotaDoc.id}:`, finaisSnap.size)
        
        finaisSnap.forEach(finalDoc => {
          const dados = finalDoc.data()
          
          const temResponsavel = dados.responsaveisIncluidos?.some(
            r => r.id === userId
          )
          
          if (temResponsavel) {
            console.log('✅ Responsável encontrado na rota:', finalDoc.id)
            
            const responsavel = dados.responsaveisIncluidos.find(r => r.id === userId)
            
            const rotaPreparada = {
              id: finalDoc.id,
              idRotaPai: rotaDoc.id,
              ...dados,
              rotaOrdenada: {
                pontos: [
                  {
                    type: 'origem',
                    coordinate: dados.startCoord || [-46.6333, -23.5505],
                    nome: 'Origem',
                    icone: 'play',
                  },
                  {
                    type: 'responsavel',
                    coordinate: [
                      responsavel?.coordenadas?.lng || -46.6333,
                      responsavel?.coordenadas?.lat || -23.5505,
                    ],
                    nome: responsavel?.nome || 'Responsável',
                    icone: 'person',
                  },
                  {
                    type: 'escola',
                    coordinate: dados.endCoord || [-46.6333, -23.5505],
                    nome: dados.nameSchool || 'Escola',
                    icone: 'school',
                  },
                ],
              }
            }
            
            rotasDoResponsavel.push(rotaPreparada)
          }
        })
      } catch (error) {
        console.error(`❌ Erro ao verificar rota ${rotaDoc.id}:`, error)
      }
    }
    
    console.log('📋 Rotas encontradas para o responsável:', rotasDoResponsavel.length)
    return rotasDoResponsavel
    
  } catch (error) {
    console.error('❌ Erro geral ao buscar rotas do responsável:', error)
    return []
  }
}