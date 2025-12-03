import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../config/firebase'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtZHMxYTdmNDBveHAyaXBwNmk0cGRtbDUifQ.mzr4-ccJpyUD5cH08FtGbQ'

export const carregarVagas = async (user, setVagas, setLoading) => {
  try {
    const ref = collection(db, 'VagasSolicitadas')
    const q = query(ref, where('idMotorista', '==', user.uid))
    const snap = await getDocs(q)

    const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    setVagas(lista)
  } catch (err) {
    console.log('Erro ao carregar vagas:', err)
  } finally {
    setLoading(false)
  }
}

export const handleStatusAction = async ({
  idVaga,
  novoStatus,
  vagas,
  setVagas,
  setProcessando,
  user,
}) => {
  try {
    setProcessando((prev) => ({ ...prev, [idVaga]: true }))

    const vagaRef = doc(db, 'VagasSolicitadas', idVaga)
    await updateDoc(vagaRef, {
      status: novoStatus,
      dataAtualizacao: new Date().toISOString(),
    })

    setVagas((old) =>
      old.map((item) =>
        item.id === idVaga ? { ...item, status: novoStatus } : item
      )
    )

    if (novoStatus !== 'aceito') return

    const vagaAtualizada = vagas.find((v) => v.id === idVaga)
    if (!vagaAtualizada) return

    const {
      idResponsavel,
      idRota,
      nomeResponsavel,
      fotoResponsavel,
      nomeEscola,
    } = vagaAtualizada

    const responsavelRef = doc(db, 'responsaveis', idResponsavel)
    const respDoc = await getDoc(responsavelRef)

    const respData = respDoc.exists() ? respDoc.data() : null

    if (!respData) return

    const enderecoTexto =
      respData.endereco ||
      respData.enderecoTexto ||
      respData.address ||
      respData.enderecoCompleto

    if (!enderecoTexto) return

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      enderecoTexto
    )}.json?access_token=${MAPBOX_TOKEN}&country=BR`
    const response = await fetch(url)
    const json = await response.json()

    if (!json.features?.length) return

    const [lng, lat] = json.features[0].center

    const rotaRef = doc(db, 'rotas', idRota)
    const rotaDoc = await getDoc(rotaRef)
    if (!rotaDoc.exists()) return

    const rotaData = rotaDoc.data()

    const rotasFinaisRef = collection(db, 'rotas', idRota, 'rotasFinais')
    const qFinal = query(rotasFinaisRef, where('status', '==', 'ativa'))
    const snapFinal = await getDocs(qFinal)

    if (!snapFinal.empty) {
      const docExistente = snapFinal.docs[0]
      const rotaExistente = docExistente.data()

      await updateDoc(docExistente.ref, {
        responsaveisIncluidos: [
          ...(rotaExistente.responsaveisIncluidos || []),
          {
            id: idResponsavel,
            nome: nomeResponsavel,
            foto: fotoResponsavel,
            escola: nomeEscola,
            endereco: enderecoTexto,
            coordenadas: { lat, lng },
            dataInclusao: new Date().toISOString(),
          },
        ],

        'routeCoordsComResponsavel.coordinates': [
          ...(rotaExistente.routeCoordsComResponsavel?.coordinates || []),
          { lat, lng },
        ],

        dataAtualizacao: new Date().toISOString(),
      })

      await updateDoc(vagaRef, {
        rotaFinalId: docExistente.id,
        rotaFinalCriada: true,
      })

      return
    }

    const rotaFinalId = `${idRota}_${idResponsavel}_${Date.now()}`
    const rotaFinalRef = doc(db, 'rotas', idRota, 'rotasFinais', rotaFinalId)

    await setDoc(rotaFinalRef, {
      ...rotaData,
      idRotaOriginal: idRota,
      idMotorista: user.uid,
      dataCriacao: new Date().toISOString(),
      status: 'ativa',

      responsaveisIncluidos: [
        {
          id: idResponsavel,
          nome: nomeResponsavel,
          foto: fotoResponsavel,
          escola: nomeEscola,
          endereco: enderecoTexto,
          coordenadas: { lat, lng },
          dataInclusao: new Date().toISOString(),
        },
      ],

      routeCoordsComResponsavel: {
        coordinates: [
          ...(rotaData.routeCoords?.coordinates || []),
          { lat, lng },
        ],
        type: 'LineString',
      },
    })

    await updateDoc(vagaRef, {
      rotaFinalId: rotaFinalId,
      rotaFinalCriada: true,
    })

    setVagas((old) =>
      old.map((item) =>
        item.id === idVaga
          ? { ...item, rotaFinalId: rotaFinalId, rotaFinalCriada: true }
          : item
      )
    )
  } catch (err) {
    console.log('Erro:', err)
  } finally {
    setProcessando((prev) => ({ ...prev, [idVaga]: false }))
  }
}
