import React from 'react'
import { Input } from './styles'

export const CustomInput = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  onChangeText,
  value,
  maxLength,
  height,
  width,
  mb,
  ph,
  br,
  bgColor,
}) => {
  return (
    <Input
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
      maxLength={maxLength}
      height={height}
      width={width}
      mb={mb}
      ph={ph}
      br={br}
      bgColor={bgColor}
    />
  );
};