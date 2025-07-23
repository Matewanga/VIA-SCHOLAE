import React from 'react'
import { EnterButton, EnterButtonText } from './styles'

export const Button = ({
  onPress,
  title,
  bg,
  pd,
  br,
  mt,
  width,
  height,
  mr,
  ml,
  color,
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
      <EnterButtonText color={color} ft={ft} fw={fw}>
        {title}
      </EnterButtonText>
    </EnterButton>
  )
}
