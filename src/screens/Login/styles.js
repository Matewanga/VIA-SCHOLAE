import styled from 'styled-components/native'
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1;
`
export const FormWrapper = styled.ScrollView`
  background-color: white;
`

export const LogoWrapper = styled.View`
  align-items: center;
  margin-top: 20px;
`

export const FormCard = styled.View`
  margin: 20px;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
`
export const RegisterOptions = styled.View`
  margin-top: 20px;
  margin-bottom: 30px;
`

export const RegisterOption = styled.View`
  margin-bottom: 15px;
`

export const RegisterText = styled.Text`
  font-size: 14px;
  color: #666;
`

export const RegisterLink = styled.Text`
  font-size: 14px;
  color: #1e88e5;
  font-weight: bold;
  margin-top: 5px;
`

export const EnterButton = styled.TouchableOpacity`
  background-color: #ffd740;
  padding: 15px;
  border-radius: 30px;
  align-items: center;
  margin-top: 20px;
`

export const EnterButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`

export const FormContainer = styled.View`
  padding-horizontal: ${theme.metrics.px(24)}px;
  padding-vertical: ${theme.metrics.px(30)}px;
`

