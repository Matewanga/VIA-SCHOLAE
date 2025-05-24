import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme[bgColor] : 'transparent'};
  padding-top: 40px;
  width: 100%;
  height: 160px;
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
`

export const Branding = styled.Text`
  color: ${({ theme, txtColor }) =>
    txtColor && theme[txtColor] ? theme[txtColor] : '#262626'};
  font-size: 20px;
  font-weight: bold;
  margin-left: 115px;
`

export const PageTitle = styled.Text`
  color: white;
  font-size: 42px;
  font-weight: bold;
  margin-top: 10px;
`
