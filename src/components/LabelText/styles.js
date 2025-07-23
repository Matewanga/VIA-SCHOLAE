import styled from 'styled-components'
import { theme } from '../../styles'

export const LabelText = styled.Text`
  font-size: ${({ ft }) =>
    ft ? theme.metrics.px(ft) + 'px' : theme.metrics.px(55) + 'px'};
  text-align: center;
  margin-bottom: ${({ mb }) =>
    mb ? theme.metrics.px(mb) + 'px' : theme.metrics.px(20) + 'px'};
  margin-top: ${({ mt }) =>
    mt ? theme.metrics.px(mt) + 'px' : theme.metrics.px(0) + 'px'};
  font-weight: bold;
  color: ${({ theme, txtColor }) =>
    txtColor && theme[txtColor] ? theme[txtColor] : '#262626'};
`
