import React from 'react'
import {
  BtnRadioContainer,
  TextContainer,
  RadioButton,
  OptionTextRadio,
} from './styles'
import { Image, StyleSheet } from 'react-native'

export const CustomRadioButton = ({ value, status, onPress, imageSource }) => {
  return (
    <BtnRadioContainer onPress={onPress}>
    <TextContainer>
      <OptionTextRadio>{value}</OptionTextRadio>
    </TextContainer>
    <RadioButton checked={status === 'checked'}>
      {status === 'checked' && (
        <Image source={imageSource} style={styles.image} />
      )}
    </RadioButton>
  </BtnRadioContainer>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
})
