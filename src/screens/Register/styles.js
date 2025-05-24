import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '../../styles'

export const Container = styled.ScrollView`
  flex: 1;
  background: ${(props) => props.theme.background};
`
export const Title = styled.Text`
  font-size: ${theme.metrics.px(30)}px;
  text-align: center;
  color: ${(props) => props.theme.text};
  margin-top: ${theme.metrics.px(30)}px;
`

export const Form = styled.View`
  padding: ${theme.metrics.px(20)}px;
`
export const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.metrics.px(10)}px;
`

export const TermsText = styled.Text`
  color: ${(props) => props.theme.yellow};
  text-decoration: underline;
`
export const TermsText1 = styled.Text`
  color: ${(props) => props.theme.text};
`
export const Motorista = styled.Text`
  font-size: ${theme.metrics.px(18)}px;
  color: ${(props) => props.theme.yellow};
  text-decoration: underline;
  text-align: center;
  margin-top: ${theme.metrics.px(15)}px;
  margin-bottom: ${theme.metrics.px(20)}px;
`

export const styles = StyleSheet.create({
  return: {
    position: 'absolute',
    top: 20,
    left: 2,
    zIndex: 1,
  },
  img: {
    width: 300,
    height: 300,
  },
  line: {
    height: 1,
    backgroundColor: '#E1B415',
    marginVertical: 3,
    marginBottom: 25,
  },
})
