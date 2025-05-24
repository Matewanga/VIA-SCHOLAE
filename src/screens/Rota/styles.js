import styled from 'styled-components/native'
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(porps) => porps.theme.background};
`

export const Header = styled.View`
  flex-direction: row;
  margin-top: ${theme.metrics.px(40)}px;
`

export const Title = styled.Text`
  font-size: ${theme.metrics.px(40)}px;
  margin-top: ${theme.metrics.px(-6)}px;
  margin-left: ${theme.metrics.px(20)}px;
  margin-bottom: ${theme.metrics.px(20)}px;
  color: ${(porps) => porps.theme.text};
`

export const Input = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.gray,
}))`
  height: ${theme.metrics.px(40)}px;
  border-color: ${(porps) => porps.theme.gray};
  border-width: ${theme.metrics.px(1)}px;
  margin-bottom: ${theme.metrics.px(20)}px;
  padding-horizontal: ${theme.metrics.px(10)}px;
  border-radius: ${theme.metrics.px(10)}px;
  background: ${(porps) => porps.theme.background};
  color: ${(porps) => porps.theme.text};
`
