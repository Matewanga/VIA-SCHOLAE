import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  padding: ${theme.metrics.px(15)}px;
`

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.metrics.px(16)}px;
`

export const InputContainer = styled.View`
  margin-left: ${theme.metrics.px(30)}px;
  align-items: center;
`

export const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.gray,
}))`
  width: ${theme.metrics.px(250)}px;
  height: ${theme.metrics.px(35)}px;
  border-radius: ${theme.metrics.px(7)}px;
  border-width: ${theme.metrics.px(1)}px;
  border-color: ${(props) => props.theme.yellow};
  color: ${props => props.theme.text};
  padding-left: ${theme.metrics.px(10)}px;
`

export const RecentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.metrics.px(8)}px;
`

export const RecentItenContent = styled.View`
  flex-direction: row;
  align-items: center;
`

export const RecentItenContainer = styled.View`
  margin-left: ${theme.metrics.px(10)}px;
`

export const TitleText = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: ${theme.metrics.px(35)}px;
  font-weight: 600;
  margin-bottom: ${theme.metrics.px(16)}px;
  margin-top: ${theme.metrics.px(30)}px;
`

export const RecentText = styled.Text`
  font-size: ${theme.metrics.px(24)}px;
  color: ${(props) => props.theme.text};
`

export const CleanText = styled.Text`
  font-size: ${theme.metrics.px(16)}px;
  color: ${(props) => props.theme.blue};
`

export const RecentItemName = styled.Text`
  font-size: ${theme.metrics.px(16)}px;
  color: ${(props) => props.theme.text};
`

export const RecentItemInfo = styled.Text`
  fontsize: ${theme.metrics.px(14)}px;
  color: ${(props) => props.theme.textsecondary};
`

export const RecentItem = styled.TouchableOpacity`
  padding-vertical: ${theme.metrics.px(10)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${(props) => props.theme.yellow};
`

export const styles = StyleSheet.create({
  pic: {
    width: 70,
    height: 70,
  },

  line: {
    marginBottom: 15,
  },

  Accountspic: {
    width: 45,
    height: 45,
  },
})
