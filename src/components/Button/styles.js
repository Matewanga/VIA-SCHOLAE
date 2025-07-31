import styled from 'styled-components'
import { theme } from '../../styles'

export const EnterButton = styled.TouchableOpacity`
  background-color: ${({ bg }) => bg || '#ffd740'};

  padding: ${({ pd }) =>
    typeof pd === 'number' ? `${theme.metrics.px(pd)}px` : pd || `${theme.metrics.px(15)}px`};
  border-radius: ${({ br }) =>
    typeof br === 'number' ? `${theme.metrics.px(br)}px` : br || `${theme.metrics.px(30)}px`};
  align-items: center;
  align-self: center;
  justify-content: center;
  margin-top: ${({ mt }) =>
    typeof mt === 'number' ? `${theme.metrics.px(mt)}px` : mt || `${theme.metrics.px(20)}px`};
  width: ${({ width }) =>
    typeof width === 'number' ? `${theme.metrics.px(width)}px` : width || `${theme.metrics.px(100)}px`};
  height: ${({ height }) =>
    typeof height === 'number' ? `${theme.metrics.px(height)}px` : height || 'auto'};
  margin-right: ${({ mr }) =>
    typeof mr === 'number' ? `${theme.metrics.px(mr)}px` : mr || '0px'};
  margin-left: ${({ ml }) =>
    typeof ml === 'number' ? `${theme.metrics.px(ml)}px` : ml || '0px'};
`


export const EnterButtonText = styled.Text`
  color: ${({ txtColor }) => txtColor || '#FFFFFF'};
  font-size: ${({ ft }) =>
    ft ? theme.metrics.px(ft) + 'px' : theme.metrics.px(18) + 'px'};
  font-weight: ${({ fw }) => fw || 'bold'};
  text-align: center;
`
