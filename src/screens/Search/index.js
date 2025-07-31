import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, Alert } from 'react-native'
import { Header, CustomInput, CustomText } from '../../components'
import {
    Container,
    SearchContainer,
    UserSearchResultCard,
    UserCardContent,
    UserCardTextContainer,
    UserPhoneText,
    UserAvatar
} from './styles'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../../database'
import { SearchUsers } from './script'

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState([])
    const navigation = useNavigation()
    const { user } = useUser()

    const fetchResults = useCallback(async () => {
        try {
            const users = await SearchUsers(searchQuery, user)
            setResults(users)
        } catch (error) {
            Alert.alert('Erro', error.message)
        }
    }, [searchQuery, user])

    useEffect(() => {
        fetchResults()
    }, [searchQuery])

    const handleSelectProfile = (profile) => {
        navigation.navigate('PerfilSearch', { profile })
    }

    const renderProfileItem = (item) => (
        <UserSearchResultCard onPress={() => handleSelectProfile(item)}>
            <UserCardContent>
                <UserAvatar source={{ uri: item.profileImageUrl }} resizeMode="cover" />
                <UserCardTextContainer>
                    <CustomText ft={23} txtColor="text">
                        {item.username}
                    </CustomText>
                    <CustomText ft={18} txtColor="textSecond">
                        {item.phone}
                    </CustomText>
                </UserCardTextContainer>
            </UserCardContent>
        </UserSearchResultCard>
    )

    return (
        <Container>
            <Header
                bgColor="darkblue"
                txtColor="white"
                iconName="chevron-back"
                color="white"
                size={40}
            >
                Pesquisar
            </Header>

            <SearchContainer>
                <CustomInput
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    height={50}
                    width={350}
                    mb={15}
                    ph={20}
                    bw={1}
                    br={25}
                    bc="black"
                    bgColor="white"
                    iconName="search"
                    iconPosition="right"
                />
            </SearchContainer>

            <FlatList
                data={results}
                keyExtractor={(item) => `${item.id}-${item.type}`}
                renderItem={({ item }) => renderProfileItem(item)}
            />
        </Container>
    )
}
