import styled from 'styled-components/native'
import { theme } from '../../../styles'

export const Container = styled.ScrollView`
  flex: 1;
`

export const Form = styled.View`
  padding: ${theme.metrics.px(20)}px;
  align-items: center;
`

export const ImgContainer = styled.View`
  width: 90%;
  height: 150px;
  background-color: #dcdcdc;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-radius: 10px;
`

export const ImagePreview = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
`

export const ImageWrapper = styled.View`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #e0e0e0;
`