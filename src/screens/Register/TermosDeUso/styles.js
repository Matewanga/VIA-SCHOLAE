import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '../../../styles'

export const Container = styled.View`
  flex: 1;
  padding: ${theme.metrics.px(20)}px;
  background: ${(props) => props.theme.background};
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.metrics.px(20)}px;
  margin-top: ${theme.metrics.px(20)}px;
  position: relative;
`

export const TitleText = styled.Text`
  font-size: ${theme.metrics.px(35)}px;
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`

export const TermosTitleText = styled.Text`
  font-size: ${theme.metrics.px(20)}px;
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`

export const TermosText = styled.Text`
  font-size: ${theme.metrics.px(16)}px;
  color: ${(props) => props.theme.text};
  text-align: justify;
  margin-bottom: 16px;
  line-height: 24px;
  padding-horizontal: 10px;
`

export const TextEmail = styled.Text`
  color: ${(props) => props.theme.blue};
`

export const styles = StyleSheet.create({
  return: {
    zIndex: 1,
  },
})
