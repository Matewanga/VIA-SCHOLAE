import styled from 'styled-components'
import { theme } from '../../../styles'

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
  margin-top: ${theme.metrics.px(30)}px;
  margin-bottom: ${theme.metrics.px(25)}px;
`
export const Check = styled.View`
  margin-top: ${theme.metrics.px(7)}px;
`
export const Form = styled.View`
  margin-top: ${theme.metrics.px(7)}px;
`
export const TitleText = styled.Text`
  font-size: ${theme.metrics.px(30)}px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`
export const Label = styled.Text`
  font-size: ${theme.metrics.px(20)}px;
  margin-left: ${theme.metrics.px(20)}px;
  color: ${(props) => props.theme.text};
  margin-bottom: ${theme.metrics.px(5)}px;
`
export const Input = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.gray,
}))`
  height: ${theme.metrics.px(40)}px;
  width: ${theme.metrics.px(350)}px;
  border-color: ${(props) => props.theme.yellow};
  border-width: ${theme.metrics.px(1)}px;
  margin-bottom: ${theme.metrics.px(10)}px;
  padding-horizontal: ${theme.metrics.px(8)}px;
  border-radius: ${theme.metrics.px(10)}px;
  margin-left: ${theme.metrics.px(20)}px;
  color: ${(props) => props.theme.text};
`
