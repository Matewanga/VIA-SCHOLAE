import React from 'react'
import { View } from 'react-native'
import { CustomText } from '../../components'

export function Timeline({ distancia, duracao }) {
  if (!distancia || !duracao) return null
  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 25,
        backgroundColor: '#FFD93D',
        borderRadius: 20,
        alignSelf: 'center',
        width: 'auto',
        maxWidth: 280,
        height: 75,
        marginTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 50,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <CustomText ft={16} txtColor="#444" mb={4}>
            Tempo Estimado
          </CustomText>

          <CustomText ft={22} fw="bold" txtColor="#000">
            {duracao ? `${Math.floor(duracao / 60)}min` : '...'}
          </CustomText>
        </View>

        <View style={{ alignItems: 'center' }}>
          <CustomText ft={16} txtColor="#444" mb={4}>
            Distância
          </CustomText>

          <CustomText ft={22} fw="bold" txtColor="#000">
            {distancia ? `${Math.round(distancia)}m` : '...'}
          </CustomText>
        </View>
      </View>
    </View>
  )
}
