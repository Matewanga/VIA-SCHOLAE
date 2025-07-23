import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { setDoc, doc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db } from '../../../config/firebase'

// Função para formatar CEP
export const formatCep = (text) => {
    const numericCep = text.replace(/\D/g, '').slice(0, 8)
    if (numericCep.length > 5) {
        return numericCep.slice(0, 5) + '-' + numericCep.slice(5)
    }
    return numericCep
}

export const formatDateInput = (text) => {
    // Remove tudo que não for número
    const cleaned = text.replace(/\D/g, '').slice(0, 8)

    let formatted = ''
    if (cleaned.length <= 2) {
        formatted = cleaned
    } else if (cleaned.length <= 4) {
        formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2)
    } else {
        formatted =
            cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4)
    }

    return formatted
}

export const isUnder18 = (dateStr) => {
    const [day, month, year] = dateStr.split('/')
    const birthDate = new Date(`${year}-${month}-${day}`)

    if (isNaN(birthDate.getTime())) return false // data inválida

    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()

    const hasHadBirthday =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

    const finalAge = hasHadBirthday ? age : age - 1
    return finalAge <= 17
}

// Buscar endereço pelo CEP via API ViaCEP
export const fetchAddressByCep = async (cep, setEnd) => {
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length !== 8) {
        setEnd('')
        return
    }
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        const data = await response.json()

        if (data.erro) {
            Alert.alert('Erro', 'CEP não encontrado')
            setEnd('')
        } else {
            const enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
            setEnd(enderecoCompleto)
        }
    } catch (error) {
        Alert.alert('Erro', 'Falha ao buscar endereço pelo CEP')
        setEnd('')
    }
}

// Upload da imagem para Firebase Storage
export const uploadImageToStorage = async (uri, path) => {
    const storage = getStorage()
    const response = await fetch(uri)
    const blob = await response.blob()

    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, blob)

    const downloadUrl = await getDownloadURL(storageRef)
    return downloadUrl
}

// Função para escolher imagem (tira foto ou galeria)
export const pickImage = async (setImage) => {
    Alert.alert('Escolher imagem', 'Deseja tirar uma foto ou escolher da galeria?', [
        {
            text: 'Galeria',
            onPress: async () => {
                const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync()
                if (!mediaPermission.granted) {
                    Alert.alert('Permissão negada', 'Permissão para acessar a galeria é necessária.')
                    return
                }

                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                })

                if (!result.canceled) setImage(result.assets[0].uri)
            },
        },
        {
            text: 'Câmera',
            onPress: async () => {
                const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()
                if (!cameraPermission.granted) {
                    Alert.alert('Permissão negada', 'Permissão para usar a câmera é necessária.')
                    return
                }

                const result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                })

                if (!result.canceled) setImage(result.assets[0].uri)
            },
        },
        { text: 'Cancelar', style: 'cancel' },
    ])
}


// Função para registrar usuário no Firebase e salvar dados no Firestore
export const handleRegisterCriancas = async ({
    userId,
    image,
    username,
    end,
    cep,
    sexo,
    dataNasc,
    escola,
    turma,
    navigation,
}) => {
    if (
        !image ||
        !username ||
        !end ||
        !cep ||
        !sexo ||
        !dataNasc ||
        !escola ||
        !turma
    ) {
        Alert.alert('Atenção!', 'Preencha todos os campos.')
        return
    }

    if (!isUnder18(dataNasc)) {
        Alert.alert('Idade inválida', 'A criança deve ter no máximo 17 anos.')
        return
    }

    try {
        const profileRef = `perfil/${userId}/foto.jpg`
        const profileUrl = await uploadImageToStorage(image, profileRef)

        await setDoc(doc(db, 'criancas', userId), {
            responsavelId: userId,
            username,
            address: end,
            cep: cep.replace(/\D/g, ''),
            sexo,
            dataNasc,
            escola,
            turma,
            type: 'crianca',
            profileImageUrl: profileUrl,
        })

        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')
        navigation.goBack()
    } catch (error) {
        console.error('Erro durante o cadastro:', error.message)
        Alert.alert('Erro', 'Erro ao realizar o cadastro. Tente novamente.')
    }
}