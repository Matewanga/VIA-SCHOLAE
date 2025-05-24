import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components'
import { Container, Title, Description, SubDescription, Button, ButtonText, ImagePlaceholder } from './styles';

export const Initial = () => {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <Header txtColor="black" color="black"/>
      <Title>VIA SCHOLAE</Title>

      <Description>
        Bem-vindo ao nosso sistema! Protegendo quem você mais ama com inovação e monitoramento em tempo real.
      </Description>

      <SubDescription>
        Transporte escolar inteligente na palma da sua mão.
      </SubDescription>

      <Button onPress={handleStart}>
        <ButtonText>Iniciar</ButtonText>
      </Button>

      <ImagePlaceholder>
        {/* Aqui você adicionará as imagens da van, rua e nuvens */}
      </ImagePlaceholder>
    </Container>
  );
};
