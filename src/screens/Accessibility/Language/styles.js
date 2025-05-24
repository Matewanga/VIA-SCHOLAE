import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../../styles'

export const Container = styled.View`
  flex: 1;
  padding: ${theme.metrics.px(16)}px;
  background: ${props => props.theme.background} ;
`

export const Header = styled.View`
  flex-direction: row;
  margin-top: ${theme.metrics.px(30)}px;
  margin-bottom: ${theme.metrics.px(20)}px;
`
export const TitleText = styled.Text`
  font-size: ${theme.metrics.px(35)}px;
  margin-left: ${theme.metrics.px(20)}px;
  margin-top: ${theme.metrics.px(-5)}px;
  color: ${props => props.theme.text};
`
export const LanguageText = styled.Text`
  font-size: ${theme.metrics.px(18)}px;
  color: ${props => props.theme.text} ;
`
export const CheckMark = styled.Text`
  fontSize: ${theme.metrics.px(18)}px;
  color: ${props => props.theme.yellow};
`
export const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.gray,
}))`
  width: ${theme.metrics.px(340)}px;
  height: ${theme.metrics.px(35)}px;
  align-self: center;
  background: ${props => props.theme.background};
  border-width: ${theme.metrics.px(1)}px;
  border-color: ${props => props.theme.yellow};
  border-radius: ${theme.metrics.px(10)}px;
  color: ${props => props.theme.text};
  margin-bottom: ${theme.metrics.px(25)}px;
  padding-left: ${theme.metrics.px(10)}px;
`
export const LanguageOption = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: ${theme.metrics.px(15)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${props => props.theme.yellow};
`

export const styles = StyleSheet.create({
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

});