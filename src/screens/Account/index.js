import React from 'react'
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
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
                    bgColor="background"
                    txtColor="text"
                    color="text"
                    logoSource={require('../../../assets/Logo_ViaScholae.png')}
                    logoSize={50}
                    height="100"
                    mb="40"
                    size={40}
                />

                <ProfileImage
                    source={{ uri: user.profileImageUrl }}
                />

                <Info />

                <TouchableOpacity onPress={() => navigation.navigate('EditUser')}>
                    <CustomText ft="30" mt="20" mb="20" txtColor="text">
                        Editar Perfil
                    </CustomText>
                </TouchableOpacity>

                <ButtonsWrapper>
                    {/* Se for responsável, mostra botão Crianças */}
                    {user.type === 'responsavel' && (
                        <Button
                            title="Crianças"
                            txtColor="text"
                            pd={15}
                            br={20}
                            width="65%"
                            height={70}
                            ft={20}
                            fw="bold"
                            onPress={() => navigation.navigate('ExibirCriancas')}
                            icon={<Ionicons name="people" size={35} color="text" />}
                        />
                    )}

                    {user.type === 'motorista' && (
                        <>
                            <Button
                                title="Rotas"
                                txtColor="text"
                                pd={15}
                                br={20}
                                width="65%"
                                height={70}
                                ft={20}
                                fw="bold"
                                onPress={() => navigation.navigate('ExibirCriancas')}
                                icon={<Ionicons name="map" size={35} color="text" />}
                            />
                            <Button
                                title="Vagas"
                                txtColor="text"
                                pd={15}
                                br={20}
                                width="65%"
                                height={70}
                                ft={20}
                                fw="bold"
                                onPress={() => navigation.navigate('ExibirCriancas')}
                                icon={<Ionicons name="briefcase" size={24} color="text" />}
                            />
                        </>
                    )}
                    <Button
                        title="Configurações"
                        txtColor="text"
                        pd={15}
                        br={20}
                        width="65%"
                        height={70}
                        ft={20}
                        fw="bold"
                        onPress={() => navigation.navigate('Settings')}
                        icon={<Ionicons name="settings" size={35} color="text" />}
                    />
                </ButtonsWrapper>
            </Container>
        </KeyboardAvoidingView>
    )
}
