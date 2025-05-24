import styled from 'styled-components';
import { StyleSheet } from 'react-native'
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1px;
  padding: ${theme.metrics.px(25)}px;
  background: ${props => props.theme.background};
`

export const ProfileContainer = styled.View`
  position: relative;
  align-items: center;
  align-self: center;
  background: ${props => props.theme.primary};
  padding: ${theme.metrics.px(20)}px;
  border-radius: ${theme.metrics.px(10)}px;
  margin-vertical: ${theme.metrics.px(20)}px;
  width: ${theme.metrics.px(358)}px;
  height: ${theme.metrics.px(185)}px;
  elevation: 4;
  marginTop: ${theme.metrics.px(90)}px;
`

export const ConProfilePic = styled.View`
  position: absolute;
  z-index: 1;
  marginTop: ${theme.metrics.px(-60)}px;
`
export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-vertical: ${theme.metrics.px(15)}px;
`


export const ProfileName = styled.Text`
  font-size: ${theme.metrics.px(30)}px;
  margin-top: ${theme.metrics.px(25)}px;
  margin-bottom: ${theme.metrics.px(3)}px;
  color: ${props => props.theme.text};
`
export const SubTitles = styled.Text`
  align-self: flex-start;
  padding-left: ${theme.metrics.px(35)}px;
  color: ${props => props.theme.textsecondary};
`

export const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
  },
})