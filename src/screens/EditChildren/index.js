import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header, Button, CustomInput, Title, CustomText } from '../../components'
import { Container, Form, ButtonContainer, ImageWrapper } from './styles'
import defaultProfile from '../../../assets/default-user.jpg'
import { useRoute } from '@react-navigation/native';

import {
    fetchAddressByCep,
    formatCep,
    handleUpdateCriancas,
    pickImage,
    formatDateInput,
    isUnder18
} from './script'

export const EditChildren = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const { criancaId, dadosCrianca } = route.params;
    const [formChanged, setFormChanged] = useState(false)

    const [usernameDisplay, setUsernameDisplay] = useState('')
    const [usernameInput, setUsernameInput] = useState('')
    const [end, setEnd] = useState('')
    const [cep, setCep] = useState('')
    const [sexo, setSexo] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [idadeValida, setIdadeValida] = useState(true)
    const [escola, setEscola] = useState('')
    const [turma, setTurma] = useState('')
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (dadosCrianca) {
            setUsernameInput(dadosCrianca.username || '')
            setUsernameDisplay(dadosCrianca.username || '')
            setEnd(dadosCrianca.address || '')
            setCep(dadosCrianca.cep || '')
            setSexo(dadosCrianca.sexo || '')
            setDataNasc(dadosCrianca.dataNasc || '')
            setEscola(dadosCrianca.escola || '')
            setTurma(dadosCrianca.turma || '')
            setImage(dadosCrianca.profileImageUrl || null)
        }
    }, [dadosCrianca])

    const isFormValid =
        image &&
        usernameInput.trim().length > 0 &&
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
                <Header bgColor="white"
                    logoSource={require('../../../assets/Logo_ViaScholae.png')}
                    logoSize={50}
                    height={100}
                    iconName="chevron-back"
                    size={40}
                >Via Scholae</Header>
                <Title ft={35} mt={25} mb={1} txtColor="darkblue">
                    {usernameDisplay}
                </Title>

                <Form>
                    <ImageWrapper>
                        <Image
                            source={image ? { uri: image } : defaultProfile}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </ImageWrapper>
                    <TouchableOpacity onPress={() => pickImage(setImage)}>
                        <CustomText
                            ft="20"
                            txtColor="darkblue"
                            mt="10"
                            mb="20"
                            style={{ textAlign: 'center' }}
                        >
                            Editar foto
                        </CustomText>
                    </TouchableOpacity>

                    <CustomInput
                        placeholder="Nome"
                        onChangeText={setUsernameInput}
                        value={usernameInput}
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
                        title="Atualizar"
                        color="white"
                        pd={15}
                        br={20}
                        width="65%"
                        height={45}
                        ft={16}
                        fw="bold"
                        onPress={() => {
                            if (!isFormValid) return
                            handleUpdateCriancas({
                                criancaId,
                                image,
                                username: usernameInput,
                                end,
                                cep,
                                sexo,
                                dataNasc,
                                escola,
                                turma,
                                navigation,
                            })
                        }}
                        bg={isFormValid ? '#ffd740' : '#999999'}
                        disabled={!isFormValid}
                    />
                </ButtonContainer>
            </Container>
        </KeyboardAvoidingView>
    )
}
