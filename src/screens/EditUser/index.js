import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Header,
  Title,
  CustomText,
  CustomInput,
  Button,
} from '../../components'
import {
  Container,
  Form,
  ProfileImage,
} from './styles'
import { useUser } from '../../database'
import { editUserPhoto, updateUserProfile } from './script'

export const EditUser = () => {
  const { user, refreshUserData } = useUser()
  const navigation = useNavigation()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState('')
  const [rg, setRg] = useState('')
  const [cpf, setCpf] = useState('')
  const [parentesco, setParentesco] = useState('')
  const [placaVan, setPlacaVan] = useState('')
  const [escolas, setEscolas] = useState('')

  useEffect(() => {
    if (user) {
      setNome(user.username || '')
      setEmail(user.email || '')
      setTelefone(user.phone || '')
      setCep(user.cep || '')
      setEndereco(user.address || '')
      setRg(user.RG || '')
      setCpf(user.CPF || '')
      setParentesco(user.parentesco || '')
      setPlacaVan(user.placaVan || '')
      setEscolas(user.escolas || '')
    }
  }, [user])

  const handleEditPhoto = async () => {
    try {
      const updated = await editUserPhoto(user, refreshUserData)
      if (updated) {
        Alert.alert('Sucesso', 'Foto atualizada com sucesso!')
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar a foto.')
    }
  }

  const handleUpdateProfile = async () => {
    try {
      const isResponsavel = user.tipo === 'responsavel'

      const dataToUpdate = {
        username: nome,
        email,
        phone: telefone,
        cep,
        address: endereco,
        RG: rg,
        CPF: cpf,
      }

      if (isResponsavel) {
        dataToUpdate.parentesco = parentesco
      } else {
        dataToUpdate.placaVan = placaVan
        dataToUpdate.escolas = escolas
      }

      await updateUserProfile(user, dataToUpdate)
      await refreshUserData()
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!')
      navigation.goBack()
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil.')
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Container contentContainerStyle={{ paddingBottom: 50 }} keyboardShouldPersistTaps="handled">
        <Header
          bgColor="white"
          color="black"
          logoSource={require('../../../assets/Logo_ViaScholae.png')}
          logoSize={50}
          height="100"
        />
        <Title ft="40" txtColor="darkblue">Seu Perfil</Title>

        <ProfileImage source={{ uri: user.profileImageUrl }} />

        <TouchableOpacity onPress={handleEditPhoto}>
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

        <CustomText ft="30" mt="20" mb="3">Ficha cadastral</CustomText>

        <Form>
          <CustomInput
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="CEP"
            value={cep}
            onChangeText={setCep}
            keyboardType="phone-pad"
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="RG"
            value={rg}
            onChangeText={setRg}
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />
          <CustomInput
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="phone-pad"
            height={50}
            width={330}
            mb={15}
            ph={20}
            bgColor="#e8e8e8"
          />

          {user?.tipo === 'responsavel' && (
            <CustomInput
              placeholder="Parentesco"
              value={parentesco}
              onChangeText={setParentesco}
              height={50}
              width={330}
              mb={15}
              ph={20}
              bgColor="#e8e8e8"
            />
          )}

          {user?.tipo === 'motorista' && (
            <>
              <CustomInput
                placeholder="Placa da Van"
                value={placaVan}
                onChangeText={setPlacaVan}
                height={50}
                width={330}
                mb={15}
                ph={20}
                bgColor="#e8e8e8"
              />
              <CustomInput
                placeholder="Escolas que atende"
                value={escolas}
                onChangeText={setEscolas}
                height={50}
                width={330}
                mb={15}
                ph={20}
                bgColor="#e8e8e8"
              />
            </>
          )}
        </Form>

        <Button
          title="Salvar"
          color="white"
          pd={15}
          br={20}
          width="50%"
          height={45}
          ft={16}
          fw="bold"
          onPress={handleUpdateProfile}
        />
      </Container>
    </KeyboardAvoidingView>
  )
}
