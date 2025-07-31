import styled from 'styled-components';
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: flex-start;
`

export const Profile = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  align-self: center;
  background-color: #a6a6a6;
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
`
export const ProfileInfo = styled.View`
  flex: 1;
  padding: 10px;
`

export const Account = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`
export const Icon = styled.View`
  flex-direction: row;
  align-items: center;
`