import styled from 'styled-components/native'
import { theme } from '../../styles'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`

export const Card = styled.View`
  width: 48%;
  margin-bottom: 20px;
  align-items: center;
  position: relative;
`

export const Foto = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 12px;
  margin-bottom: 8px;
`
