import styled from 'styled-components/native'
import { theme } from '../../styles'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`

export const Form = styled.View`
  padding: ${theme.metrics.px(20)}px;
  align-items: center;
`

export const Info = styled.View`
  background-color: #2d3070ff;
  padding-top: 100px;
  padding-horizontal: ${theme.metrics.px(20)}px;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ProfileImage = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  position: absolute;
  align-self: center;
  top: 90px;
  z-index: 10;
`
export const ButtonsWrapper = styled.View`
  align-items: center;
  gap: 5px;
  margin-top: 50px;
`

export const IconLeft = styled.View`
  margin-right: 10px;
`
