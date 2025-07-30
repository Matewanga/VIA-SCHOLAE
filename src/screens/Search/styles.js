import styled from 'styled-components'
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const SearchContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.metrics.px(16)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${(props) => props.theme.secondary};
`
export const UserSearchResultCard = styled.TouchableOpacity`
  padding: ${theme.metrics.px(10)}px ${theme.metrics.px(16)}px;
  border-bottom-width: ${theme.metrics.px(1)}px;
  border-bottom-color: ${(props) => props.theme.secondary};
`
export const UserCardContent = styled.View`
  flex-direction: row;
  align-items: center;
`
export const UserAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  margin-bottom: 10px;
`
export const UserCardTextContainer = styled.View`
  margin-left: ${theme.metrics.px(10)}px;
  justify-content: center;
  align-items: flex-start;
`