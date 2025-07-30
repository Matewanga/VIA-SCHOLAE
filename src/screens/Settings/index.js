import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    Header,
    CustomText,
    ButtonYourAccount,
    ButtonAccessibility,
} from '../../components'
import {
    Container,
    BtnProfile,
    UserAvatar,
    ProfileInfo,
    ProfileName,
    ProfilePhone,
    ProfileEmail,
    BtnYourAccount,
    IconAcContainer,
    TextAcContainer,
    OptionTextAc,
} from './styles'
import { useUser } from '../../database'
import { Ionicons } from '@expo/vector-icons'

export const Settings = () => {
    const navigation = useNavigation()
    const { logout, user } = useUser()

    return (
        <Container>
            <Header bgColor="darkblue" txtColor="text" color="white" size={40}>Configurações</Header>
            <BtnProfile onPress={() => navigation.navigate('EditProfile')}>
                <UserAvatar source={{ uri: user.profileImageUrl }} resizeMode="cover" />
                <ProfileInfo>
                    <ProfileName>{user ? user.username : 'Nome não disponível'}</ProfileName>
                    <ProfilePhone>{user ? user.phone : 'Número não disponível'}</ProfilePhone>
                    <ProfileEmail>{user ? user.email : 'Email não disponível'}</ProfileEmail>
                </ProfileInfo>
            </BtnProfile>

            <CustomText txtColor="text" ft={25}>Configurações do APP</CustomText>


            <BtnYourAccount onPress={() => navigation.navigate('YourAccount')}>
                <IconAcContainer>
                    <Ionicons name="person-outline" size={50} />
                    <TextAcContainer>
                        <OptionTextAc>Conta</OptionTextAc>
                    </TextAcContainer>
                </IconAcContainer>
            </BtnYourAccount>

            <ButtonAccessibility />


        </Container>
    )
}
