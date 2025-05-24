import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { theme } from '../../../styles'

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: ${theme.metrics.px(16)}px;
`

export const Header = styled.View`
  margin-bottom: ${theme.metrics.px(20)}px;
`

export const Table = styled.View`
  border-width: ${theme.metrics.px(1.5)}px;
  border-color: ${(props) => props.theme.yellow};
  border-radius: ${theme.metrics.px(4)}px;
  margin-bottom: ${theme.metrics.px(20)}px;
  margin-top: ${theme.metrics.px(10)}px;
`

export const TableHeader = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.background};
  padding: ${theme.metrics.px(8)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-color: ${(props) => props.theme.yellow};
`

export const TableRow = styled.View`
  flex-direction: row;
  padding: ${theme.metrics.px(
    15
  )}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-color: ${(props) => props.theme.yellow};
`

export const TableCell = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${theme.metrics.px(
    16
  )}px; /* Reduzido para evitar quebra de linha */
  color: ${(props) => props.theme.text};
  overflow: hidden; 
  font-weight: bold;
`

export const TitleText = styled.Text`
  font-size: ${theme.metrics.px(40)}px;
  text-align: center;
  color: ${(props) => props.theme.text};
  margin-top: ${theme.metrics.px(40)}px;
  margin-right: ${theme.metrics.px(230)}px;
`

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: ${theme.metrics.px(16)}px;
  text-align: center;
`

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.background};
  border-width: ${theme.metrics.px(2)}px;
  border-color: ${(props) => props.theme.yellow};
  padding: 10px 20px;
  border-radius: ${theme.metrics.px(15)}px;
  align-self: flex-end;
`

export const styles = StyleSheet.create({
  return: {
    position: 'absolute',
    top: 46,
    left: 5,
    zIndex: 1,
  },
})
