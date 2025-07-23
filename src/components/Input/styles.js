import styled from 'styled-components/native';
import { theme } from '../../styles'

export const Input = styled.TextInput`
  height: ${({ height }) => height || `${theme.metrics.px(40)}px`};
  width: ${({ width }) => width || `${theme.metrics.px(300)}px`};
  margin-bottom: ${({ mb }) => mb || `${theme.metrics.px(20)}px`};
  padding-horizontal: ${({ ph }) => ph || `${theme.metrics.px(20)}px`};
  border-radius: ${({ br }) => br || `${theme.metrics.px(15)}px`};
  background-color: ${({ bgColor }) => bgColor || '#FFFFFF'};
  align-self: center;
`;
