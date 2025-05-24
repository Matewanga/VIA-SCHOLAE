import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1;
  padding: ${theme.metrics.px(20)}px;
  background: ${(props) => props.theme.background};
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: ${theme.metrics.px(20)}px;
  margin-bottom: ${theme.metrics.px(25)}px;
`

export const ProfileContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.metrics.px(20)}px;
`

export const FormContainer = styled.View`
  margin-top: ${theme.metrics.px(20)}px;
`

export const Content = styled.TouchableOpacity`
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${props => props.theme.yellow};
  margin-bottom: ${theme.metrics.px(20)}px;
`

export const TitleText = styled.Text`
  position: absolute;
  font-size: ${theme.metrics.px(35)}px;
  font-weight: 700;
  margin-left: ${theme.metrics.px(35)}px;
  color: ${props => props.theme.text};
`

export const EditPictureText = styled.Text`
  color: ${props => props.theme.yellow};
`

export const Label = styled.Text`
  font-size: ${theme.metrics.px(20)}px; 
  color: ${props => props.theme.text};
  margin-bottom: ${theme.metrics.px(2)}px;
`

export const ContentText = styled.Text`
  font-size: ${theme.metrics.px(16)}px;
  color: ${props => props.theme.gray};
`

export const styles = StyleSheet.create({
  back: {
    marginTop: 3,
  },
})
