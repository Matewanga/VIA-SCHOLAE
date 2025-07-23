import styled from 'styled-components/native'
import { theme } from '../../../styles'

export const Container = styled.ScrollView`
  flex: 1;
`

export const Form = styled.View`
  padding: ${theme.metrics.px(20)}px;
  align-items: center;
`

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
  margin-top: -15px;
`

export const ImageWrapper = styled.View`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #e0e0e0;
`