import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  ProfilePic,
  ButtonChildren,
  ButtonEdit,
  ButtonSettings,
  Line,
  BtnRotas,
  ButtonVagas,
} from '../../components'
import {
  Container,
  ProfileContainer,
  ConProfilePic,
  ButtonsContainer,
  ProfileName,
  SubTitles,
  styles,
} from './styles'
import { useUser } from '../../database'

export const Account = () => {
  const { user } = useUser()
  const navigation = useNavigation()
  const [vagas, setVagas] = useState(null)

  useEffect(() => {
    const fetchVagas = () => {
      try {
        if (user && user.type === 'motorista') {
          setVagas(user.vagas || 'Não disponível')
        }
      } catch (error) {
        console.error('Erro ao buscar vagas: ', error)
      }
    }

    fetchVagas()
  }, [user])

  const handleNavigateToRotas = () => {
    if (user) {
      navigation.navigate('ExibirRota', { motoristaId: user.id })
    } else {
      console.error('Usuário não encontrado no contexto.')
    }
  }

  const handleNavigateToVagas = () => {
    if (user) {
      navigation.navigate('Vagas', { motoristaId: user.id })
    } else {
      console.error('Usuário não encontrado no contexto.')
    }
  }

  return (
    <Container>
      <ProfileContainer>
        <ConProfilePic>
          <ProfilePic style={styles.img} />
        </ConProfilePic>
        <ProfileName>{user ? user.username : 'Usuário não logado'}</ProfileName>
        <SubTitles>Email: {user ? user.email : 'Email não disponível'}</SubTitles>
        <SubTitles>Número: {user ? user.phone : 'Número não disponível'}</SubTitles>
        <SubTitles>Endereço: {user && user.address ? user.address : 'Endereço não disponível'}</SubTitles>
        <SubTitles>CEP: {user ? user.cep : 'CEP não disponível'}</SubTitles>

        {user && user.type === 'motorista' && (
          <SubTitles>Vagas: {vagas ?? 'Carregando...'}</SubTitles>
        )}
      </ProfileContainer>

      <ButtonsContainer>
        {user && user.type === 'responsavel' && <ButtonChildren />}
        {user && user.type === 'motorista' && (
          <BtnRotas onPress={handleNavigateToRotas} />
        )}
        {user && user.type === 'motorista' && <ButtonVagas onPress={handleNavigateToVagas} />}
        <ButtonEdit />
      </ButtonsContainer>

      <Line />

      <ButtonSettings />
    </Container>
  )
}
