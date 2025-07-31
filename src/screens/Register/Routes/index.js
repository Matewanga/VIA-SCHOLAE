import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { Container } from './styles'
import { Header, Button, CustomInput, Title } from '../../../components'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../../../database'


export const RegisterRoute = () => {
    const [startPoint, setStartPoint] = useState('')
    const [cepStart, setCepStart] = useState('')
    const [endPoint, setEndPoint] = useState('')
    const [cepEnd, setCepEnd] = useState('')
    const [nameSchool, setNameSchool] = useState('')
    const [numberSchool, setNumberSchool] = useState('')
    const [region, setRegion] = useState('')
    const navigation = useNavigation()
    const { user } = useUser()

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <Container contentContainerStyle={{ paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
                <Header bgColor="blue" txtColor="white" size={40} color="white">CADASTRO RESPONSÁVEL</Header>
                <Title ft={35} mt={25} mb={1}>
                    Cadastre sua Rota:
                </Title>
                <CustomInput
                    placeholder="Ponto Inicial"
                    value={startPoint}
                    onChangeText={setStartPoint}
                    height={50}
                    width={330}
                    mb={15}
                    ph={20}
                    bgColor="#e8e8e8"
                />
                <CustomInput
                    placeholder="CEP Ponto Inicial"
                    value={cepStart}
                    onChangeText={setCepStart}
                    height={50}
                    width={330}
                    mb={15}
                    ph={20}
                    maxLength={8}
                    bgColor="#e8e8e8"
                    keyboardType="numeric"
                />
                <CustomInput
                    placeholder="Ponto Final"
                    value={endPoint}
                    onChangeText={setEndPoint}
                    height={50}
                    width={330}
                    mb={15}
                    ph={20}
                    bgColor="#e8e8e8"
                />
                <CustomInput
                    placeholder="CEP Ponto Final"
                    value={cepEnd}
                    onChangeText={setCepEnd}
                    height={50}
                    width={330}
                    mb={15}
                    ph={20}
                    maxLength={8}
                    bgColor="#e8e8e8"
                    keyboardType="numeric"
                />
                <CustomInput
                    placeholder="Nome da Escola"
                    value={nameSchool}
                    onChangeText={setNameSchool}
                    height={50}
                    width={330}
                    mb={15}
                    ph={20}
                    bgColor="#e8e8e8"
                />
                <CustomInput
                    placeholder="Número da Escola"
                    value={numberSchool}
                    onChangeText={setNumberSchool}
                    height={50}
                    width={330}
                    mb={15}
                    ph={20}
                    bgColor="#e8e8e8"
                />
                <CustomInput
                    placeholder="Área de Operação"
                    value={region}
                    onChangeText={setRegion}
                    height={50}
                    width={330}
                    mb={15}
                    ph={20}
                    bgColor="#e8e8e8"
                />
                <Button
                    title="Cadastrar"
                    txtColor="text"
                    pd={15}
                    br={20}
                    width="65%"
                    height={45}
                    ft={16}
                    fw="bold"
                    onPress={() =>
                        handleRegisterRoute({
                            startPoint,
                            cepStart,
                            endPoint,
                            cepEnd,
                            nameSchool,
                            numberSchool,
                            region,
                            navigation,
                        })
                    }
                />
                <ButtonCadastro onPress={handleRegisterRoute}>Cadastrar</ButtonCadastro>
            </Container>
        </KeyboardAvoidingView>
    )
}
