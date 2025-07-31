import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    Header,
    CustomText,
    Button,
} from '../../components'
import {
    Container,
    Profile,
    UserAvatar,
    ProfileInfo,
    Account,
    Icon,
} from './styles'
import { useUser } from '../../database'
import { Ionicons } from '@expo/vector-icons'

export const Settings = () => {
    const navigation = useNavigation()
    const { user } = useUser()

    const handleLogout = async () => {
        try {
            // Remove dados salvos, se houver
            await AsyncStorage.clear()

            // Redireciona para tela de login e limpa o histórico de navegação
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        } catch (error) {
            console.log('Erro ao sair da conta:', error)
        }
    }

    return (
        <Container>
            <Header bgColor="darkblue" txtColor="white" color="white" size={40}>Configurações</Header>

            <Profile onPress={() => navigation.navigate('EditUser')}>
                <UserAvatar source={{ uri: user.profileImageUrl }} resizeMode="cover" />
                <ProfileInfo>
                    <CustomText ft={20} txtColor="white">{user.username}</CustomText>
                    <CustomText ft={18} txtColor="white">{user.phone}</CustomText>
                    <CustomText ft={18} txtColor="white">{user.email}</CustomText>
                </ProfileInfo>
            </Profile>

            <CustomText txtColor="black" ft={25}>Configurações do APP</CustomText>

            <Account>
                <Icon>
                    <Ionicons name="person-outline" size={50} />
                    <CustomText ft={20} txtColor="text">Conta</CustomText>
                </Icon>
            </Account>
            <Account>
                <Icon>
                    <Ionicons name="accessibility-outline" size={50} />
                    <CustomText ft={20} txtColor="text">Acessibilidade</CustomText>
                </Icon>
            </Account>

            <Button
                title="Sair da Conta"
                width={200}
                height={45}
                ft={23}
                pd={0}
                txtColor="text"
                onPress={handleLogout}
            />
        </Container>
    )
}
