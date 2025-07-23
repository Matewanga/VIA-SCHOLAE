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
  bgColor,
  isPassword = false,
  isPhone = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const inputStyle = {
    height: height || 50,
    width: width || 330,
    marginBottom: mb || 15,
    paddingHorizontal: ph || 20,
    backgroundColor: bgColor || '#e8e8e8',
    borderRadius: br || 10,
    flexDirection: 'row',
    alignItems: 'center',
  }

  return (
    <View style={inputStyle}>
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

      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}
