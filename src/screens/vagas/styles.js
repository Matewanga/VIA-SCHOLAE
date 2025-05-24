import styled from 'styled-components/native'
import { theme } from '../../styles'
import { StyleSheet } from 'react-native'

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: ${(props) => props.theme.background};
`

export const Header = styled.View`
  flex-direction: row;
    margin-bottom: ${theme.metrics.px(25)}px;
`

export const VagasAceitas = styled.View``

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justifycontent: space-between;
  padding: ${theme.metrics.px(10)}px;
  margin-bottom: ${theme.metrics.px(10)}px;
  border-width: ${theme.metrics.px(1)}px;
  border-color: ${(props) => props.theme.yellow};
  border-radius: ${theme.metrics.px(8)}px;
`

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-left: 35px;
`

export const SubTitlesContainer = styled.View``

export const Title = styled.Text`
  font-size: ${theme.metrics.px(30)}px;
  margin-top: ${theme.metrics.px(40)}px;
  margin-left: ${theme.metrics.px(80)}px;
  color: ${(props) => props.theme.text};
  font-weight: 800;
`

export const TitleSecond = styled.Text`
  font-size: ${theme.metrics.px(30)}px;
  margin-left: ${theme.metrics.px(115)}px;
  color: ${(props) => props.theme.text};
`

export const SubTitle = styled.Text`
  font-size: ${theme.metrics.px(18)}px;
  margin: ${theme.metrics.px(5)}px;
  color: ${(props) => props.theme.text};
  font-weight: 700;
`

export const AcceptBtn = styled.TouchableOpacity`
  margin-right: ${theme.metrics.px(10)}px;
`

export const RejectBtn = styled.TouchableOpacity`
  margin-right: ${theme.metrics.px(10)}px;
`

export const styles = StyleSheet.create({
  returnButton: {
    marginTop: 40,
  },
  acceptButton: {
    marginRight: 10,
  },
  rejectButton: {},
})
