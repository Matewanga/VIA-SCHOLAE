import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaskedTextInput } from 'react-native-mask-text'

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
  bw,
  bc,
  bgColor,
  isPassword = false,
  isPhone = false,
  iconName = null,
  iconPosition = 'left',
  iconColor = 'black',
  iconSize = 22,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const inputContainerStyle = {
    height: height || 50,
    width: width || 330,
    marginBottom: mb || 15,
    paddingHorizontal: ph || 20,
    backgroundColor: bgColor || '#e8e8e8',
    borderRadius: br || 10,
    borderWidth: bw || 0,
    borderColor: bc || 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const renderLeftIcon = () => {
    if (iconName && iconPosition === 'left') {
      return (
        <Ionicons
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={{ marginRight: 10 }}
        />
      )
    }
    return null
  }

  const renderRightIcon = () => {
    if (isPassword) {
      return (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      )
    } else if (iconName && iconPosition === 'right') {
      return (
        <Ionicons
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={{ marginLeft: 10 }}
        />
      )
    }
    return null
  }

  return (
    <View style={inputContainerStyle}>
      {renderLeftIcon()}
      {isPhone ? (
        <MaskedTextInput
          mask="(99) 99999-9999"
          keyboardType="numeric"
          onChangeText={onChangeText}
          value={value}
          style={{ flex: 1 }}
          placeholder={placeholder}
        />
      ) : (
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !showPassword}
          onChangeText={onChangeText}
          value={value}
          maxLength={maxLength}
          style={{ flex: 1 }}
        />
      )}
      {renderRightIcon()}
    </View>
  )
}
