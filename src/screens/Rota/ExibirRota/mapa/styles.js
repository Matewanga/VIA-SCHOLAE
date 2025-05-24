import styled from 'styled-components'
import { theme } from '../../../../styles'


export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
`

export const Header = styled.View`
  margin-bottom: ${theme.metrics.px(50)}px;
`

export const HeaderContainer = styled.View`
  width: ${theme.metrics.px(430)}px;
  height: ${theme.metrics.px(570)}px;
  margin-bottom: ${theme.metrics.px(20)}px;
  background-color: #363636;
  justify-content: center;
`
