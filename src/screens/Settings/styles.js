import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.background};
  justify-content: flex-start;
`

export const BtnProfile = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  align-self: center;
  background: ${(props) => props.theme.primary};
  padding: ${theme.metrics.px(15)}px;
  border-radius: ${theme.metrics.px(10)}px;
  margin-bottom: ${theme.metrics.px(30)}px;
  width: ${theme.metrics.px(380)}px;
  height: ${theme.metrics.px(153)}px;
`
export const UserAvatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin-bottom: 10px;
`
export const ProfileInfo = styled.View`
  flex: 1;
  padding: 10px;
`
export const ProfileName = styled.Text`
  font-size: ${theme.metrics.px(25)}px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`
export const ProfilePhone = styled.Text`
  font-size: ${theme.metrics.px(15)}px;
  color: ${(props) => props.theme.textsecondary};
`
export const ProfileEmail = styled.Text`
  font-size: ${theme.metrics.px(15)}px;
  color: ${(props) => props.theme.textsecondary};
`

export const BtnYourAccount = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${theme.metrics.px(15)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${(props) => props.theme.black};
`
export const IconAcContainer = styled.View`
  flex-direction: row;
  align-items: center;
`
export const TextAcContainer = styled.View`
  margin-left: ${theme.metrics.px(10)}px;
`
export const OptionTextAc = styled.Text`
  font-size: ${theme.metrics.px(16)}px;
  color: ${(props) => props.theme.text};
`