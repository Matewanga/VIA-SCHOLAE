import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import {
  ButtonChildren,
  ProfilePic,
  BtnRotas,
  ButtonMessage,
} from '../../../components'
import {
  Container,
  Header,
  ProfileContainer,
  ConProfilePic,
  ProfileName,
  SubTitles,
  CloseButton,
  ButtonContainer,
  styles,
} from './styles'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../../../database'
import { db } from '../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const PerfilSearch = ({ route }) => {
  const { profile } = route.params
  const theme = useTheme()
  const navigation = useNavigation()
  const { user } = useUser()
  const [vagas, setVagas] = useState(null)

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        if (profile.type === 'motorista') {
          const motoristaDoc = await getDoc(doc(db, 'motoristas', profile.id))
          if (motoristaDoc.exists()) {
            setVagas(motoristaDoc.data().vagas)
          }
        }
      } catch (error) {
        console.error('Erro ao buscar vagas: ', error)
      }
    }
    fetchVagas()
  }, [profile])

  return (
    <Container>
      <Header>
        <CloseButton onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={35} color={theme.text} />
        </CloseButton>
      </Header>

      <ProfileContainer>
        <ConProfilePic>
          <ProfilePic style={styles.img} />
        </ConProfilePic>

        <ProfileName>{profile.username}</ProfileName>
        <SubTitles>
          <Text>{profile.email}</Text>
        </SubTitles>
        <SubTitles>
          <Text>{profile.phone}</Text>
        </SubTitles>

        {profile.type === 'motorista' && (
          <SubTitles>Vagas na van: {vagas ?? 'Carregando...'}</SubTitles>
        )}
      </ProfileContainer>

      <ButtonContainer>
        {profile.type === 'responsavel' && <ButtonChildren />}
        {profile.type === 'motorista' && (
          <BtnRotas
            onPress={() =>
              navigation.navigate('ExibirRota', { motoristaId: profile.id })
            }
          />
        )}
      </ButtonContainer>

      <ButtonMessage
        onPress={() => {
          // Criar identificadores únicos para o chat
          const motoristaId =
            profile.type === 'motorista'
              ? `motorista_${profile.id}`
              : `motorista_${user.id}`
          const responsavelId =
            profile.type === 'responsavel'
              ? `responsavel_${profile.id}`
              : `responsavel_${user.id}`

          // Garantir um ID único e consistente para o chat
          const chatId = [motoristaId, responsavelId].sort().join('_')

          // Navegar para a tela de mensagens
          navigation.navigate('Message', {
            profile: profile,
            user: user,
            chatId: chatId,
          })
        }}
      >
        Mensagem
      </ButtonMessage>
    </Container>
  )
}
