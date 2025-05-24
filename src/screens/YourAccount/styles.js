import styled from 'styled-components'
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  padding: ${theme.metrics.px(16)}px;
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.metrics.px(24)}px;
  margin-top: ${theme.metrics.px(30)}px;
`

export const TitleText = styled.Text`
  font-size: ${theme.metrics.px(36)}px;
  font-weight: bold;
  margin-left: ${theme.metrics.px(16)}px;
  color: ${(props) => props.theme.text};
`
