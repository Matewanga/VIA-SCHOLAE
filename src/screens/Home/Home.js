import React, { useEffect, useState } from 'react'
import { Header } from '../../components'
import {
  Container,
} from './styles'
import MapboxGL from '@rnmapbox/maps'
import { Text } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiY29vaW5nbXRjZG9hIiwiYSI6ImNtZHMxYTdmNDBveHAyaXBwNmk0cGRtbDUifQ.mzr4-ccJpyUD5cH08FtGbQ'
)

export const Home = () => {


  return (
    <Container>
      <Header txtColor="white" bgColor="blue" color="white" size={40} >Rota</Header>
    </Container>
  )
}
