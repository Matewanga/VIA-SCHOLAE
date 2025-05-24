import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Return, CustomRadioButton } from '../../../components';
import { Container, Header, OptionsContainer, TitleText } from './styles';
import Check from '../../../../assets/check.png';

export const Theme = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Inicializa o estado com o valor vindo dos parâmetros ou um valor padrão
  const [checked, setChecked] = useState(route.params?.themeStatus || 'off');

  const handleSelection = (value) => {
    setChecked(value); // Atualiza o estado localmente
  };

  const handleReturn = () => {
    // Ao clicar em voltar, envia o valor selecionado para a tela 'Accessibility'
    navigation.navigate('Accessibility', { themeStatus: checked });
  };

  // Atualiza o estado 'checked' sempre que os parâmetros forem alterados
  useEffect(() => {
    if (route.params?.themeStatus) {
      setChecked(route.params.themeStatus);
    }
  }, [route.params?.themeStatus]);

  return (
    <Container>
      <Header>
        <Return onPress={handleReturn} />
        <TitleText>Tema</TitleText>
      </Header>
      <OptionsContainer>
        <CustomRadioButton
          value="On"
          status={checked === 'on' ? 'checked' : 'unchecked'}
          onPress={() => handleSelection('on')}
          imageSource={Check}
        />
        <CustomRadioButton
          value="Off"
          status={checked === 'off' ? 'checked' : 'unchecked'}
          onPress={() => handleSelection('off')}
          imageSource={Check}
        />
      </OptionsContainer>
    </Container>
  );
};
