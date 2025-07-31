import React from 'react'
import { EnterButton, EnterButtonText } from './styles'
import { View } from 'react-native'

export const Button = ({
  onPress,
  title,
  icon,
  bg,
  pd,
  br,
  mt,
  width,
  height,
  mr,
  ml,
  txtColor,
  ft,
  fw,
}) => {
  return (
    <EnterButton
      onPress={onPress}
      bg={bg}
      pd={pd}
      br={br}
      mt={mt}
      width={width}
      height={height}
      mr={mr}
      ml={ml}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        <EnterButtonText txtColor={txtColor} ft={ft} fw={fw}>
          {title}
        </EnterButtonText>
      </View>
    </EnterButton>
  )
}
