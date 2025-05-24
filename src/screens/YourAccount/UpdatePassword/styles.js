import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import { theme } from '../../../styles'

export const Container = styled.View`
  flex: 1;
  padding: ${theme.metrics.px(16)}px;
  background: ${(props) => props.theme.background};
`

export const Header = styled.View`
  flex-direction: row;
  margin-top: ${theme.metrics.px(30)}px;
`

export const Form = styled.View`
  margin-top: ${theme.metrics.px(30)}px;
  align-items: center;
`

export const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.gray,
}))`
  height: ${theme.metrics.px(40)}px;
  width: ${theme.metrics.px(340)}px;
  border-color: ${(props) => props.theme.yellow};
  border-width: ${theme.metrics.px(1)}px;
  margin-bottom: ${theme.metrics.px(20)}px;
  padding-horizontal: ${theme.metrics.px(10)}px;
  border-radius: ${theme.metrics.px(10)}px;
  background: ${(props) => props.theme.background};
  color: ${props => props.theme.text};
`
export const TitleText = styled.Text`
  font-size: ${theme.metrics.px(36)}px;
  margin-bottom: ${theme.metrics.px(16)}px;
  margin-left: ${theme.metrics.px(15)}px;
  color: ${props => props.theme.text};
`
export const Label = styled.Text`
  color: ${props => props.theme.text};
  font-size: ${theme.metrics.px(24)}px;
  margin-right: ${theme.metrics.px(140)}px;
`

export const styles = StyleSheet.create({
  back: {
    marginTop: 5,
  },
})
