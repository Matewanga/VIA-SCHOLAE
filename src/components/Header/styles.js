import styled from 'styled-components/native'
import { theme } from '../../styles'

export const Container = styled.View`
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme[bgColor] : 'transparent'};
  padding-top: 40px;
  width: 100%;
  height: ${({ height }) =>
    typeof height === 'number' ? `${theme.metrics.px(height)}px` : height || 'auto'};
  margin-bottom: ${({ mb }) =>
    mb ? theme.metrics.px(mb) + 'px' : theme.metrics.px(20) + 'px'};
  padding-bottom: 20px;
  padding-horizontal: 20px;
  align-items: center;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

export const TopRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`
export const LeftBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
export const RightBox = styled.View`
  align-items: center;
  justify-content: center;
`

export const Branding = styled.Text`
  position: absolute;
  left: 50%;
  transform: translateX(-50px);
  color: ${({ theme, txtColor }) =>
    txtColor && theme[txtColor] ? theme[txtColor] : '#262626'};
  font-size: 20px;
  font-weight: bold;
  flex-direction: row;
  align-items: center;
`

export const PageTitle = styled.Text`
  color: white;
  font-size: 42px;
  font-weight: bold;
  margin-top: 10px;
`
