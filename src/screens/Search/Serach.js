import React, { useState, useEffect, useCallback } from 'react'
import { TouchableOpacity, FlatList, Alert, Text } from 'react-native'
import { ProfilePic, Line } from '../../components'
import {
  styles,
  Container,
  SearchContainer,
  InputContainer,
  RecentHeader,
  RecentItenContent,
  RecentItenContainer,
  RecentText,
  CleanText,
  RecentItemInfo,
  RecentItemName,
  TitleText,
  Input,
  RecentItem,
} from './styles'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../config/firebase'
import { useUser } from '../../database'
import { collection, query, where, getDocs } from 'firebase/firestore'

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const navigation = useNavigation()
  const { user } = useUser()

  const fetchResults = useCallback(async () => {
    if (searchQuery.length >= 2 && user) {
      try {
        const searchCollection =
          user.type === 'motorista' ? 'responsaveis' : 'motoristas'
        const userRef = collection(db, searchCollection)

        // Query de busca parcial
        const userQuery = query(
          userRef,
          where('username', '>=', searchQuery),
          where('username', '<=', searchQuery + '\uf8ff')
        )

        const snapshot = await getDocs(userQuery)
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setResults(users)
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
        Alert.alert('Erro', 'Houve um erro ao buscar usuários.')
      }
    } else {
      setResults([])
    }
  }, [searchQuery, user])

  useEffect(() => {
    fetchResults()
  }, [searchQuery])

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile)
    setSearchQuery('')
    navigation.navigate('PerfilSearch', { profile })
  }

  const handleClearSelection = () => {
    setSelectedProfile(null) // Limpa a seleção do perfil
  }

  const renderProfileItem = (item) => (
    <RecentItem onPress={() => handleSelectProfile(item)}>
      <RecentItenContent>
        <ProfilePic style={styles.Accountspic} />
        <RecentItenContainer>
          <RecentItemName>{item.username}</RecentItemName>
          <RecentItemInfo>
            <Text>{item.type}</Text>
          </RecentItemInfo>
        </RecentItenContainer>
      </RecentItenContent>
    </RecentItem>
  )

  return (
    <Container>
      <TitleText>Pesquisa</TitleText>

      <SearchContainer>
        <ProfilePic style={styles.pic}></ProfilePic>
        <InputContainer>
          <Input
            placeholder="Pesquisa pelo nome"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </InputContainer>
      </SearchContainer>

      <Line style={styles.line}></Line>

      {selectedProfile && (
        <RecentHeader>
          <RecentText>Recentes</RecentText>
          <TouchableOpacity onPress={handleClearSelection}>
            <CleanText>Limpar Tudo</CleanText>
          </TouchableOpacity>
        </RecentHeader>
      )}

      {selectedProfile ? (
        <RecentItem>
          <RecentItenContent>
            <ProfilePic style={styles.Accountspic} />
            <RecentItenContainer>
              <RecentItemName>{selectedProfile.username}</RecentItemName>
              <RecentItemInfo>
                <Text>{selectedProfile.type}</Text>
              </RecentItemInfo>
            </RecentItenContainer>
          </RecentItenContent>
        </RecentItem>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.id}-${item.type}`}
          renderItem={({ item }) => renderProfileItem(item)}
        />
      )}
    </Container>
  )
}
