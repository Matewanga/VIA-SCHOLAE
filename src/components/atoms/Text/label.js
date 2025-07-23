import React from 'react'
import { Text } from 'react-native'

export const CustomLabelText = ({
  children,
  txtColor,
  fontSize,
  textAlign,
  mt = 0,
  mb = 0,
  ml = 0,
  mr = 0,
  style,
  onPress,
}) => {
  return (
    <Text
      children={children}
      txtColor={txtColor}
      fontSize={fontSize}
      textAlign={textAlign}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      style={style}
      onPress={onPress}
    />
  )
}
