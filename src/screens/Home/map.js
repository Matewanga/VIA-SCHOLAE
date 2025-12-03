import React, { useState, useRef, useEffect } from 'react'
import { View } from 'react-native'
import MapboxGL from '@rnmapbox/maps'
import Icon from 'react-native-vector-icons/Ionicons'
import { calcularCentroMapa } from './script'
import { CustomText } from '../../components'
import { Timeline } from './timeLine'

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtZHMxYTdmNDBveHAyaXBwNmk0cGRtbDUifQ.mzr4-ccJpyUD5cH08FtGbQ'
)

export function MapSection({
  rotaGeojson,
  rotaAtual,
  rotaIniciada,
  isMotorista = true,
  vanPosition,
}) {
  const mostrarComoIniciada = isMotorista ? rotaIniciada : true
  const rotaSelecionada = rotaAtual?.rotaOrdenada?.pontos?.length > 0
  const cameraConfig = calcularCentroMapa(rotaAtual)

  const [userIsMovingMap, setUserIsMovingMap] = useState(false)
  const cameraRef = useRef(null)

  const [distanciaRestante, setDistanciaRestante] = useState(null)
  const [tempoRestante, setTempoRestante] = useState(null)

  const distanciaTotal = rotaAtual?.distance || 0
  const duracaoTotal = rotaAtual?.duration || 0

  const [coordsPercorridos, setCoordsPercorridos] = useState([])
  const [coordsRestantes, setCoordsRestantes] = useState([])

  useEffect(() => {
    if (!vanPosition) return
    if (userIsMovingMap) return

    cameraRef.current?.setCamera({
      centerCoordinate: vanPosition,
      zoomLevel: 15,
      animationDuration: 800,
    })
  }, [vanPosition, userIsMovingMap])

  useEffect(() => {
    if (!rotaGeojson || !vanPosition) return

    const coords = rotaGeojson.geometry.coordinates

    let distanciaPercorrida = 0
    let menorDist = Infinity
    let pontoMaisProximoIndex = 0

    // 1 — Achar o ponto da linha mais próximo da van
    coords.forEach((coord, index) => {
      const d = calcularDistancia(vanPosition, coord)
      if (d < menorDist) {
        menorDist = d
        pontoMaisProximoIndex = index
      }
    })

    // 2 — Distância percorrida
    for (let i = 1; i < pontoMaisProximoIndex; i++) {
      distanciaPercorrida += calcularDistancia(coords[i - 1], coords[i])
    }

    // 3 — Atualizar valores
    const restante = distanciaTotal - distanciaPercorrida
    setDistanciaRestante(restante > 0 ? restante : 0)

    const progresso = distanciaPercorrida / distanciaTotal
    const tempoR = duracaoTotal * (1 - progresso)
    setTempoRestante(tempoR > 0 ? tempoR : 0)

    // 🔥 4 — SEPARAR LINHA EM DUAS
    const percorridos = coords.slice(0, pontoMaisProximoIndex + 1)
    const restantes = coords.slice(pontoMaisProximoIndex)

    setCoordsPercorridos(percorridos)
    setCoordsRestantes(restantes)
  }, [vanPosition])

  if (!rotaAtual) {
    return (
      <View style={{ height: 350, width: '100%', position: 'relative' }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            borderRadius: 10,
          }}
        >
          <Icon name="map-outline" size={60} color="white" />
          <CustomText
            ft={20}
            fw="bold"
            color="white"
            mt={15}
            style={{ textAlign: 'center' }}
          >
            Selecione uma rota
          </CustomText>
          <CustomText
            ft={16}
            color="#ccc"
            mt={5}
            style={{ textAlign: 'center', paddingHorizontal: 40 }}
          >
            Clique em "Início" para escolher sua rota
          </CustomText>
        </View>

        <MapboxGL.MapView
          style={{ flex: 1, opacity: 0.3 }}
          styleURL="mapbox://styles/mapbox/streets-v11"
        >
          <MapboxGL.Camera
            centerCoordinate={[-46.6333, -23.5505]}
            zoomLevel={11}
          />
        </MapboxGL.MapView>
      </View>
    )
  }

  return (
    <View style={{ width: '100%', position: 'relative' }}>
      <View style={{ height: 350 }}>
        <MapboxGL.MapView
          style={{ flex: 1, opacity: rotaSelecionada ? 1 : 0.3 }}
          styleURL="mapbox://styles/mapbox/streets-v11"
          onTouchStart={() => setUserIsMovingMap(true)}
          onTouchEnd={() => setUserIsMovingMap(false)}
          rotateEnabled={false}
          pitchEnabled={false}
        >
          <MapboxGL.Camera
            ref={cameraRef}
            centerCoordinate={cameraConfig.center}
            zoomLevel={cameraConfig.zoom}
          />

          {/* LINHA */}
          {/* LINHA JÁ PERCORRIDA (cinza) */}
          {coordsPercorridos.length > 1 && (
            <MapboxGL.ShapeSource
              id="rotaPercorrida"
              shape={{
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: coordsPercorridos,
                },
              }}
            >
              <MapboxGL.LineLayer
                id="linhaPercorrida"
                style={{
                  lineColor: '#A0A0A0',
                  lineWidth: 5,
                  lineOpacity: 0.8,
                }}
              />
            </MapboxGL.ShapeSource>
          )}

          {/* LINHA RESTANTE (azul) */}
          {coordsRestantes.length > 1 && (
            <MapboxGL.ShapeSource
              id="rotaRestante"
              shape={{
                type: 'Feature',
                geometry: { type: 'LineString', coordinates: coordsRestantes },
              }}
            >
              <MapboxGL.LineLayer
                id="linhaRestante"
                style={{
                  lineColor: '#4285F4',
                  lineWidth: 5,
                  lineOpacity: 0.9,
                }}
              />
            </MapboxGL.ShapeSource>
          )}

          {/* PONTOS */}
          {rotaSelecionada &&
            rotaAtual.rotaOrdenada.pontos.map((p, i) => (
              <MapboxGL.PointAnnotation
                key={i}
                id={`p-${i}`}
                coordinate={p.coordinate}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor:
                      p.type === 'origem'
                        ? '#34A853'
                        : p.type === 'responsavel'
                          ? isMotorista
                            ? '#FBBC05'
                            : '#4285F4'
                          : '#EA4335',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                >
                  <Icon
                    name={
                      p.type === 'origem'
                        ? 'car'
                        : p.type === 'responsavel'
                          ? 'person'
                          : 'school'
                    }
                    size={12}
                    color="white"
                  />
                </View>
              </MapboxGL.PointAnnotation>
            ))}

          {/* VAN */}
          {vanPosition && (
            <MapboxGL.PointAnnotation id="van" coordinate={vanPosition}>
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              >
                <Icon name="car" size={18} color="#262626" />
              </View>
            </MapboxGL.PointAnnotation>
          )}
        </MapboxGL.MapView>
      </View>

      {/* TIMELINE DINÂMICA AQUI */}
      {distanciaRestante !== null && tempoRestante !== null ? (
        <Timeline distancia={distanciaRestante} duracao={tempoRestante} />
      ) : null}
    </View>
  )
}

function calcularDistancia(a, b) {
  const R = 6371000
  const lat1 = a[1] * (Math.PI / 180)
  const lat2 = b[1] * (Math.PI / 180)
  const dLat = (b[1] - a[1]) * (Math.PI / 180)
  const dLon = (b[0] - a[0]) * (Math.PI / 180)

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2

  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}
