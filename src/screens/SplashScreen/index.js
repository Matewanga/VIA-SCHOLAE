import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Header, Button, Title } from '../../components'
import {
  Container,
  Description,
  SubDescription,
  ImagePlaceholder,
} from './styles'

export const Initial = () => {
  const navigation = useNavigation()

  const handleStart = () => {
    navigation.navigate('Login')
  }

  return (
    <Container>
      <Header txtColor="black" color="black" width="500">Via Scholae</Header>
      <Title
        txtColor="blue"
        style={{
          textShadowColor: 'pink',
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 4,
        }}
      >
        VIA SCHOLAE
      </Title>

      <Description>
        Bem-vindo ao nosso sistema! Protegendo quem você mais ama com inovação e
        monitoramento em tempo real.
      </Description>

      <SubDescription>
        Transporte escolar inteligente na palma da sua mão.
      </SubDescription>

      <Button title="Iniciar" width={230} pd={10} br={20} ft={25} onPress={handleStart}/>

      <ImagePlaceholder>
      </ImagePlaceholder>
    </Container>
  )
}
