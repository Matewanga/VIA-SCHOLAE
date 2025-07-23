import { Alert } from 'react-native'
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore'
import { db, auth } from '../../../config/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'

export const formatCep = (text) => {
    const numericCep = text.replace(/\D/g, '').slice(0, 8)
    if (numericCep.length > 5) {
        return numericCep.slice(0, 5) + '-' + numericCep.slice(5)
    }
    return numericCep
}

// Função para formatar CPF
export const formatCpf = (text) => {
    const numericCpf = text.replace(/\D/g, '').slice(0, 11)
    let formattedCpf = numericCpf

    if (numericCpf.length > 9) {
        formattedCpf =
            numericCpf.slice(0, 3) + '.' +
            numericCpf.slice(3, 6) + '.' +
            numericCpf.slice(6, 9) + '-' +
            numericCpf.slice(9)
    } else if (numericCpf.length > 6) {
        formattedCpf =
            numericCpf.slice(0, 3) + '.' +
            numericCpf.slice(3, 6) + '.' +
            numericCpf.slice(6)
    } else if (numericCpf.length > 3) {
        formattedCpf =
            numericCpf.slice(0, 3) + '.' +
            numericCpf.slice(3)
    }

    return formattedCpf
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
    return await getDownloadURL(storageRef)
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
export const handleRegisterMotorista = async (params) => {
    const {
        image,
        username,
        phone,
        email,
        end,
        cep,
        RG,
        CPF,
        cnhFrente,
        cnhVerso,
        password,
        confPassword,
        navigation,
    } = params

    if (
        !image ||
        !username ||
        !phone ||
        !email ||
        !end ||
        !cep ||
        !RG ||
        !CPF ||
        !cnhFrente ||
        !cnhVerso ||
        !password ||
        !confPassword
    ) {
        Alert.alert('Atenção!', 'Preencha todos os campos e insira as imagens da CNH.')
        return
    }

    if (password !== confPassword) {
        Alert.alert('Erro', 'As senhas não coincidem')
        return
    }

    try {
        const collectionName = 'motoristas'

        const emailQuery = query(collection(db, collectionName), where('email', '==', email))
        const emailSnapshot = await getDocs(emailQuery)
        if (!emailSnapshot.empty) {
            Alert.alert('Erro', 'Já existe um cadastro com este email.')
            return
        }

        const cpfQuery = query(collection(db, collectionName), where('cpf', '==', CPF))
        const cpfSnapshot = await getDocs(cpfQuery)
        if (!cpfSnapshot.empty) {
            Alert.alert('Erro', 'Já existe um cadastro com este CPF.')
            return
        }

        if (!email.includes('@') || password.length < 6) {
            Alert.alert('Erro', 'Email inválido ou senha muito curta (mín. 6 caracteres).')
            return
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        const frenteRef = `cnh/${user.uid}/frente.jpg`
        const versoRef = `cnh/${user.uid}/verso.jpg`
        const profileRef = `perfil/${user.uid}/foto.jpg`

        const urlFrente = await uploadImageToStorage(cnhFrente, frenteRef)
        const urlVerso = await uploadImageToStorage(cnhVerso, versoRef)
        const profileUrl = await uploadImageToStorage(image, profileRef)

        await setDoc(doc(db, 'motoristas', user.uid), {
            username,
            phone,
            email,
            address: end,
            cep: cep.replace(/\D/g, ''),
            RG,
            CPF: CPF.replace(/\D/g, ''),
            type: 'motorista',
            cnhFrenteUrl: urlFrente,
            cnhVersoUrl: urlVerso,
            profileImageUrl: profileUrl,
        })

        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')
        navigation.navigate('MainHome')
    } catch (error) {
        console.error('Erro durante o cadastro:', error)
        Alert.alert('Erro', 'Erro ao realizar o cadastro. Tente novamente.')
    }
}
