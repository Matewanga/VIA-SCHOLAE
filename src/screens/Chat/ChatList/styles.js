import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import { theme } from '../../../styles'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const ChatItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`

export const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #ddd;
`

export const ChatContent = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
`

export const ChatInfo = styled.View`
  flex: 1;
  margin-right: 10px;
`

export const ChatName = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #333;
  margin-bottom: 2px;
`

export const ChatMessage = styled.Text`
  font-size: 16px;
  color: #666;
`

export const ChatTime = styled.Text`
  font-size: 16px;
  color: #999;
`
