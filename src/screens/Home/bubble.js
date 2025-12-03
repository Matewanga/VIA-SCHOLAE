import React from 'react'
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { Button, CustomText } from '../../components'
import Icon from 'react-native-vector-icons/Ionicons'

export function BubbleFinalRoutes({
  mostrarBubble,
  setMostrarBubble,
  setRotaAtual,
  setRotaIniciada,
  onSelecionarRota,
  rotasFinais,
  rotaAtual,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={mostrarBubble}
      onRequestClose={() => setMostrarBubble(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            padding: 20,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            maxHeight: '70%',
          }}
        >
          <CustomText ft={20} fw="bold" mb={15}>
            Escolha a rota final:
          </CustomText>

          {rotasFinais.length === 0 ? (
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Icon name="warning-outline" size={40} color="#ccc" />
              <CustomText ft={16} color="#666" mt={10}>
                Nenhuma rota final encontrada
              </CustomText>
            </View>
          ) : (
            <ScrollView>
              {rotasFinais.map((rota) => {
                const nomeResponsavel =
                  rota.responsaveisIncluidos?.[0]?.nome || 'Sem nome'
                const nomeEscola = rota.nameSchool || 'Escola'

                return (
                  <TouchableOpacity
                    key={rota.id}
                    onPress={() => {
                      console.log('Rota selecionada no bubble:', rota.id)

                      const rotaPreparada = {
                        ...rota,
                        rotaOrdenada: {
                          pontos: [
                            {
                              type: 'origem',
                              coordinate: rota.startCoord || [
                                -46.6333, -23.5505,
                              ],
                              nome: 'Origem',
                              icone: 'play',
                            },
                            {
                              type: 'responsavel',
                              coordinate: [
                                rota.responsaveisIncluidos?.[0]?.coordenadas
                                  ?.lng || -46.6333,
                                rota.responsaveisIncluidos?.[0]?.coordenadas
                                  ?.lat || -23.5505,
                              ],
                              nome:
                                rota.responsaveisIncluidos?.[0]?.nome ||
                                'Responsável',
                              icone: 'person',
                            },
                            {
                              type: 'escola',
                              coordinate: rota.endCoord || [-46.6333, -23.5505],
                              nome: rota.nameSchool || 'Escola',
                              icone: 'school',
                            },
                          ],
                        },
                      }

                      if (onSelecionarRota) {
                        onSelecionarRota(rotaPreparada)
                      }
                    }}
                    style={{
                      backgroundColor: '#f8f9fa',
                      padding: 15,
                      borderRadius: 12,
                      marginBottom: 10,
                      borderWidth: 1,
                      borderColor: '#e9ecef',
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: '#4285F4',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 15,
                        }}
                      >
                        <Icon name="map" size={20} color="white" />
                      </View>

                      <View style={{ flex: 1 }}>
                        <CustomText ft={16} fw="bold" color="#333">
                          Para: {nomeEscola}
                        </CustomText>

                        {rota.startPoint && (
                          <CustomText ft={12} color="#888" mt={2}>
                            De: {rota.startPoint.substring(0, 30)}...
                          </CustomText>
                        )}

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginRight: 15,
                            }}
                          >
                            <Icon name="person" size={18} color="#FBBC05" />
                            <CustomText ft={14} color="#666" ml={4}>
                              1 passageiros
                            </CustomText>
                          </View>
                        </View>
                      </View>

                      <Icon name="chevron-forward" size={20} color="#999" />
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          )}

          <Button
            title="Cancelar"
            bgColor="#ccc"
            txtColor="#333"
            mt={15}
            onPress={() => {
              setMostrarBubble(false)
            }}
          />
        </View>
      </View>
    </Modal>
  )
}
