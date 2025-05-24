import styled from 'styled-components'
import { StyleSheet } from 'react-native';
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
`
export const HeaderContainer = styled.View`
  width: ${theme.metrics.px(430)}px;
  height: ${theme.metrics.px(570)}px;
  background-color: #363636;
  justify-content: center;
`

export const ApiContainer = styled.View`
  padding-left: ${theme.metrics.px(25)}px;
  margin-top: ${theme.metrics.px(15)}px;
`

export const Chegada = styled.Text`
  font-size: ${theme.metrics.px(50)}px;
  color: ${(props) => props.theme.text};
  margin-bottom: ${theme.metrics.px(2)}px;
`

export const TimeText = styled.Text`
  font-size: ${theme.metrics.px(30)}px;
  color: rgb(172, 172, 172);
`

export const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});