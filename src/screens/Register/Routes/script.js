import axios from 'axios'
import { db } from '../../../config/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtZHMxYTdmNDBveHAyaXBwNmk0cGRtbDUifQ.mzr4-ccJpyUD5cH08FtGbQ'

export const fetchAddressFromCep = async (cep) => {
    try {
        if (cep.length === 8) {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data = await response.json()
            if (!data.erro) {
                return `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
            }
        }
    } catch (err) {
        console.error('Erro no viaCEP:', err)
    }
    return ''
}

export const geocodeAddress = async (address) => {
    try {
        const encoded = encodeURIComponent(address)
        const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?access_token=${MAPBOX_TOKEN}`)
        if (res.data.features && res.data.features.length > 0) {
            const [lng, lat] = res.data.features[0].center
            return [lng, lat]
        }
        return null
    } catch (err) {
        console.error('Erro ao geocodificar:', err)
        return null
    }
}

export const fetchRoute = async (start, end) => {
    try {
        const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${MAPBOX_TOKEN}`)
        if (res.data.routes && res.data.routes.length > 0) {
            return res.data.routes[0].geometry
        }
        return null
    } catch (err) {
        console.error('Erro ao buscar rota:', err)
        return null
    }
}

export const handleRegisterRoute = async ({
    motoristaId,
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
    user,
    navigation
}) => {
    try {
        if (!user) {
            alert('Usuário não autenticado')
            return
        }

        const fixedRouteCoords = {
            ...routeCoords,
            coordinates: routeCoords.coordinates.map(coord => ({ lng: coord[0], lat: coord[1] })),
        }
        // Montar o objeto a salvar
        const routeData = {
            motoristaId,
            startPoint,
            cepStart,
            startCoord,
            endPoint,
            cepEnd,
            endCoord,
            routeCoords: fixedRouteCoords,
            nameSchool,
            numberSchool,
            region,
            createdAt: Timestamp.now(),
            status: 'ativa',
        }

        // Salvar na coleção 'rotas'
        const docRef = await addDoc(collection(db, 'rotas'), routeData)

        alert('Rota cadastrada com sucesso!')

        // Se quiser, navegue para outra tela, ex:
        // if (navigation) {
        //     navigation.goBack()
        // }

        return docRef.id
    } catch (error) {
        console.error('Erro ao salvar rota:', error)
        alert('Erro ao cadastrar rota')
        return null
    }
}
