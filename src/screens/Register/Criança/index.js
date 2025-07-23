import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Image, View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header, Button, CustomInput, Title } from '../../../components'
import { Container, Form, ButtonContainer, ImageWrapper } from './styles'
import defaultProfile from '../../../../assets/default-user.jpg'
import { useUser } from '../../../database'

import { fetchAddressByCep, formatCep, handleRegisterCriancas, pickImage, formatDateInput, isUnder18 } from './script'

export const RegisterCrianca = () => {
    const navigation = useNavigation()
    const { user } = useUser()

    const [username, setUsername] = useState('')
    const [end, setEnd] = useState('')
    const [cep, setCep] = useState('')
    const [sexo, setSexo] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [idadeValida, setIdadeValida] = useState(true)
    const [escola, setEscola] = useState('')
    const [turma, setTurma] = useState('')
    const [image, setImage] = useState(null)

    const isFormValid =
        image &&
        username.trim().length > 0 &&
        end.trim().length > 0 &&
        cep.trim().length > 0 &&
        sexo.trim().length > 0 &&
        dataNasc.trim().length === 10 &&
        idadeValida &&
        escola.trim().length > 0 &&
        turma.trim().length > 0

    useEffect(() => {
        fetchAddressByCep(cep, setEnd)
    }, [cep])

    const handleCepChange = (text) => {
        setCep(formatCep(text))
    }

    const handleDateChange = (text) => {
        const formatted = formatDateInput(text)
        setDataNasc(formatted)

        if (formatted.length === 10) {
            setIdadeValida(isUnder18(formatted))
        } else {
            setIdadeValida(true)
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <Container contentContainerStyle={{ paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
                <Header bgColor="blue" txtColor="text" title="CADASTRO CRIANÇA">Via Scholae</Header>
                <Title ft={35} mt={25} mb={1}>
                    Faça o Cadastro:
                </Title>

                <Form>
                    <ImageWrapper>
                        <Image
                            source={image ? { uri: image } : defaultProfile}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </ImageWrapper>
                    <ButtonContainer style={{ marginBottom: 20 }}>
                        <Button
                            title={image ? 'Alterar foto' : 'Escolher foto'}
                            color="white"
                            pd={15}
                            br={20}
                            width="60%"
                            height={45}
                            ft={16}
                            fw="bold"
                            onPress={() => pickImage(setImage)}
                        />
                    </ButtonContainer>

                    <CustomInput
                        placeholder="Nome"
                        onChangeText={setUsername}
                        value={username}
                        maxLength={30}
                        height={50}
                        width={330}
                        mb={15}
                        ph={20}
                        bgColor="#e8e8e8"
                    />
                    <CustomInput
                        placeholder="CEP"
                        keyboardType="phone-pad"
                        onChangeText={handleCepChange}
                        value={cep}
                        maxLength={9}
                        height={50}
                        width={330}
                        mb={15}
                        ph={20}
                        bgColor="#e8e8e8"
                    />
                    <CustomInput
                        placeholder="Endereço"
                        onChangeText={setEnd}
                        value={end}
                        maxLength={100}
                        height={50}
                        width={330}
                        mb={15}
                        ph={20}
                        bgColor="#e8e8e8"
                    />
                    <CustomInput
                        placeholder="Sexo"
                        onChangeText={setSexo}
                        value={sexo}
                        maxLength={20}
                        height={50}
                        width={330}
                        mb={15}
                        ph={20}
                        bgColor="#e8e8e8"
                    />
                    <CustomInput
                        placeholder="Data Nascimento"
                        onChangeText={handleDateChange}
                        keyboardType="phone-pad"
                        value={dataNasc}
                        maxLength={10}
                        height={50}
                        width={330}
                        mb={15}
                        ph={20}
                        bgColor="#e8e8e8"
                    />
                    {!idadeValida && (
                        <Text style={{ color: 'red', marginTop: -12, marginBottom: 10 }}>
                            A criança deve ter até 17 anos.
                        </Text>
                    )}
                    <CustomInput
                        placeholder="Escola"
                        onChangeText={setEscola}
                        value={escola}
                        maxLength={100}
                        height={50}
                        width={330}
                        mb={15}
                        ph={20}
                        bgColor="#e8e8e8"
                    />
                    <CustomInput
                        placeholder="Turma"
                        onChangeText={setTurma}
                        value={turma}
                        maxLength={100}
                        height={50}
                        width={330}
                        mb={15}
                        ph={20}
                        bgColor="#e8e8e8"
                    />
                </Form>

                <ButtonContainer>
                    <Button
                        title="Cadastrar"
                        color="white"
                        pd={15}
                        br={20}
                        width="65%"
                        height={45}
                        ft={16}
                        fw="bold"
                        onPress={() =>
                            handleRegisterCriancas({
                                userId: user.uid,
                                image,
                                username,
                                end,
                                cep,
                                sexo,
                                dataNasc,
                                escola,
                                turma,
                                navigation,
                            })
                        }
                        bg={isFormValid ? '#ffd740' : '#999999'}
                        disabled={!isFormValid}
                    />
                </ButtonContainer>
            </Container>
        </KeyboardAvoidingView>
    )
}
