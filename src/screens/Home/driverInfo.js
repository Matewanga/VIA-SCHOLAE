import React from 'react'
import { View, Image } from 'react-native'
import { CustomText } from '../../components'
import Icon from 'react-native-vector-icons/Ionicons'

export function DriverInfo({ user, rotaAtual, isMotorista }) {
  if (!rotaAtual) return null

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 30,
          padding: 15,
          backgroundColor: '#f0f7ff',
          borderRadius: 12,
          borderLeftWidth: 4,
          borderLeftColor: '#4285F4',
        }}
      >
        <Image
          source={{ uri: user.profileImageUrl }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 3,
            borderColor: '#4285F4',
          }}
        />

        <View style={{ marginLeft: 15, flex: 1 }}>
          <CustomText ft={26} fw="bold" color="#333">
            {user.username}
          </CustomText>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
          >
            <Icon
              name={isMotorista ? 'person' : 'car'}
              size={18}
              color="#666"
              style={{ marginTop: 2 }}
            />
            <CustomText ft={16} color="#666" ml={6} style={{ lineHeight: 20 }}>
              {isMotorista ? 'Motorista' : 'Seu Motorista'}
            </CustomText>
          </View>

          {!isMotorista && user.phone && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <Icon
                name="call"
                size={16}
                color="#4285F4"
                style={{ marginTop: 1 }}
              />
              <CustomText
                ft={14}
                color="#4285F4"
                ml={6}
                style={{ lineHeight: 18 }}
              >
                {user.phone}
              </CustomText>
            </View>
          )}
        </View>
      </View>

      {isMotorista ? (
        <>
          <CustomText ft={22} fw="bold" color="#333" mb={15}>
            Passageiros ({rotaAtual?.responsaveisIncluidos?.length || 0})
          </CustomText>

          {rotaAtual?.responsaveisIncluidos?.map((responsavel, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 15,
                padding: 15,
                backgroundColor: '#f9f9f9',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#eee',
              }}
            >
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 22,
                  backgroundColor: '#0e194d',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                  marginTop: 2,
                }}
              >
                <CustomText ft={18} color="white" fw="bold">
                  {index + 1}
                </CustomText>
              </View>

              <View style={{ flex: 1 }}>
                <CustomText ft={20} fw="bold">
                  {responsavel.nome}
                </CustomText>

                {responsavel.parentesco && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 3,
                    }}
                  >
                    <Icon
                      name="people"
                      size={14}
                      color="#666"
                      style={{ marginTop: 1 }}
                    />
                    <CustomText
                      ft={14}
                      color="#666"
                      ml={5}
                      style={{ lineHeight: 16 }}
                    >
                      {responsavel.parentesco}
                    </CustomText>
                  </View>
                )}

                {responsavel.endereco && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginTop: 5,
                    }}
                  >
                    <Icon
                      name="location"
                      size={14}
                      color="#888"
                      style={{ marginTop: 2 }}
                    />
                    <CustomText
                      ft={13}
                      color="#888"
                      ml={5}
                      style={{ flex: 1, lineHeight: 16 }}
                    >
                      {responsavel.endereco.substring(0, 35)}...
                    </CustomText>
                  </View>
                )}
              </View>
            </View>
          ))}
        </>
      ) : (
        <>
          <View
            style={{
              padding: 15,
              backgroundColor: '#e8f5e9',
              borderRadius: 12,
              marginBottom: 20,
              borderLeftWidth: 4,
              borderLeftColor: '#34A853',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Icon name="person-circle" size={24} color="#34A853" />
              <CustomText
                ft={18}
                fw="bold"
                color="#333"
                ml={8}
                style={{ lineHeight: 24 }}
              >
                Sua Parada
              </CustomText>
            </View>

            <CustomText ft={22} fw="bold" color="#333">
              {user.username}
            </CustomText>

            {rotaAtual?.responsaveisIncluidos?.[0]?.endereco && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
              >
                <Icon
                  name="home"
                  size={16}
                  color="#666"
                  style={{ marginTop: 1 }}
                />
                <CustomText
                  ft={14}
                  color="#666"
                  ml={6}
                  style={{ flex: 1, lineHeight: 18 }}
                >
                  {rotaAtual.responsaveisIncluidos[0].endereco}
                </CustomText>
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: '#c8e6c9',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Icon name="list" size={18} color="#666" />
                <CustomText
                  ft={12}
                  color="#666"
                  mt={4}
                  style={{ lineHeight: 14 }}
                >
                  Parada 1
                </CustomText>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Icon name="people" size={18} color="#666" />
                <CustomText
                  ft={12}
                  color="#666"
                  mt={4}
                  style={{ lineHeight: 14 }}
                >
                  {rotaAtual?.responsaveisIncluidos?.length || 1} total
                </CustomText>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Icon name="time" size={18} color="#666" />
                <CustomText
                  ft={12}
                  color="#666"
                  mt={4}
                  style={{ lineHeight: 14 }}
                >
                  Em andamento
                </CustomText>
              </View>
            </View>
          </View>

          {rotaAtual?.responsaveisIncluidos?.length > 1 && (
            <View
              style={{
                padding: 15,
                backgroundColor: '#f8f9fa',
                borderRadius: 10,
                marginBottom: 15,
              }}
            >
              <CustomText ft={16} fw="bold" color="#333" mb={10}>
                Mais {rotaAtual.responsaveisIncluidos.length - 1} parada(s) na
                rota
              </CustomText>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                {Array.from({
                  length: rotaAtual.responsaveisIncluidos.length - 1,
                }).map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: '#e0e0e0',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CustomText ft={14} color="#666" fw="bold">
                      {index + 2}
                    </CustomText>
                  </View>
                ))}
              </View>
            </View>
          )}
        </>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 18,
          backgroundColor: '#fff3e0',
          borderRadius: 12,
          marginTop: 10,
          borderLeftWidth: 4,
          borderLeftColor: '#EA4335',
        }}
      >
        <View
          style={{
            width: 55,
            height: 55,
            borderRadius: 28,
            backgroundColor: '#EA4335',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
          }}
        >
          <Icon name="school" size={26} color="white" />
        </View>

        <View style={{ flex: 1 }}>
          <CustomText ft={24} fw="bold" color="#333">
            {rotaAtual?.nameSchool || 'Escola'}
          </CustomText>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
          >
            <Icon name="flag" size={18} color="#666" style={{ marginTop: 1 }} />
            <CustomText ft={16} color="#666" ml={6} style={{ lineHeight: 20 }}>
              Destino Final
            </CustomText>
          </View>

          {rotaAtual?.endPoint && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <Icon
                name="navigate"
                size={16}
                color="#888"
                style={{ marginTop: 1 }}
              />
              <CustomText
                ft={14}
                color="#888"
                ml={6}
                style={{ flex: 1, lineHeight: 18 }}
              >
                {rotaAtual.endPoint.substring(0, 40)}...
              </CustomText>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
