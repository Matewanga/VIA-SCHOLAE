import React from 'react'
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
    Header,
    CustomText,
    Button,
} from '../../components'
import {
    Container,
    Info,
    ProfileImage,
    ButtonsWrapper,
} from './styles'
import { useUser } from '../../database'
import { FontAwesome, Feather } from '@expo/vector-icons'

export const Account = () => {
    const { user } = useUser()
    const navigation = useNavigation()

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <Container contentContainerStyle={{ paddingBottom: 10 }} keyboardShouldPersistTaps="handled">
                <Header
                    bgColor="white"
                    color="black"
                    logoSource={require('../../../assets/Logo_ViaScholae.png')}
                    logoSize={50}
                    height="100"
                    mb="40"
                />

                <ProfileImage
                    source={{ uri: user.profileImageUrl }}
                />

                <Info />

                <TouchableOpacity onPress={() => navigation.navigate('EditUser')}>
                    <CustomText ft="30" mt="20" mb="20">
                        Editar Perfil
                    </CustomText>
                </TouchableOpacity>

                <ButtonsWrapper>
                    <Button
                        title="Crianças"
                        color="black"
                        pd={15}
                        br={20}
                        width="65%"
                        height={70}
                        ft={20}
                        fw="bold" 
                        onPress={() => navigation.navigate('ExibirCriancas')}/>
                    <Button
                        title="Configurações"
                        color="black"
                        pd={15}
                        br={20}
                        width="65%"
                        height={70}
                        ft={20}
                        fw="bold" />


                </ButtonsWrapper>
            </Container>
        </KeyboardAvoidingView>
    )
}
