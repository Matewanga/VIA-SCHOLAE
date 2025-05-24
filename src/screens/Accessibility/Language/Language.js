import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Return, Line } from '../../../components'
//import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  LanguageText,
  CheckMark,
  TitleText,
  Input,
  LanguageOption,
} from './styles'

export const Language = () => {
  const navigation = useNavigation()
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [searchText, setSearchText] = useState('')

  const languages = [
    { id: '1', name: 'Portuguese' },
    { id: '2', name: 'English' },
  ]

  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <Container>
      <Header>
        <Return onPress={() => navigation.navigate('Accessibility')} />
        <TitleText>Idioma</TitleText>
      </Header>
      {/*<Ionicons name="search" size={24} color="gray" style={styles.icon} />*/}
      <Input
        placeholder="Procurar Idioma"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <Line />

      <FlatList
        data={filteredLanguages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LanguageOption onPress={() => setSelectedLanguage(item.name)}>
            <LanguageText>{item.name}</LanguageText>
            {selectedLanguage === item.name && <CheckMark>✓</CheckMark>}
          </LanguageOption>
        )}
      />
    </Container>
  )
}
