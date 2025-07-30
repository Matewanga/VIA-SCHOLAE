import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import { theme } from '../../../styles'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.metrics.px(20)}px;
`

export const ChatContent = styled.View`
  flex-direction: row;
  align-items: center;
`

export const ChatTextContainer = styled.View`
  margin-left: ${theme.metrics.px(10)}px;
`

export const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.gray,
}))`
  height: ${theme.metrics.px(35)}px;
  width: ${theme.metrics.px(340)}px;
  border-color: ${(props) => props.theme.yellow};
  border-width: ${theme.metrics.px(1)}px;
  margin-bottom: ${theme.metrics.px(20)}px;
  padding-horizontal: ${theme.metrics.px(10)}px;
  margin-left: ${theme.metrics.px(25)}px;
  border-radius: ${theme.metrics.px(10)}px;
  background: ${(props) => props.theme.background};
  color: ${props => props.theme.text};
`;

export const TitleText = styled.Text`
  font-size: ${theme.metrics.px(50)}px;
  text-align: left;
  margin-bottom: ${theme.metrics.px(20)}px;
  margin-top: ${theme.metrics.px(30)}px;
  color: ${(props) => props.theme.text};
`

export const ChatName = styled.Text`
  font-size: ${theme.metrics.px(20)}px;
  margin-top: ${theme.metrics.px(-5)}px;
  font-weight: 700;
  color: ${(props) => props.theme.text};
`

export const ChatMessage = styled.Text`
  font-size: ${theme.metrics.px(14)}px;
  color: ${(props) => props.theme.textsecondary};
`

export const ChatItem = styled.TouchableOpacity`
  padding: ${theme.metrics.px(15)}px;
  background: ${props => props.theme.primary};
  border-radius: ${theme.metrics.px(10)}px;
  margin-bottom: ${theme.metrics.px(10)}px;
  height: ${theme.metrics.px(76)}px;
`

export const styles = StyleSheet.create({
  pic: {
    width: 45,
    height: 45,
  },
})
