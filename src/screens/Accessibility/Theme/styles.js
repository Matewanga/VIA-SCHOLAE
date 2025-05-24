import styled from 'styled-components'
import { theme } from '../../../styles'

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  padding: ${theme.metrics.px(15)}px;
`

export const Header = styled.View`
  flex-direction: row;
  margin-top: ${theme.metrics.px(35)}px;
`

export const OptionsContainer = styled.View`
  margin-top: ${theme.metrics.px(20)}px;
  padding-horizontal: ${theme.metrics.px(20)}px;
`

export const TitleText = styled.Text`
  font-size: ${theme.metrics.px(35)}px;
  margin-left: ${theme.metrics.px(20)}px;
  margin-top: ${theme.metrics.px(-6)}px;
  color: ${(props) => props.theme.text};
`
