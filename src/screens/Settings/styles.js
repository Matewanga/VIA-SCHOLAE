import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../styles'

export const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.background};
  padding: ${theme.metrics.px(20)}px;
  justify-content: flex-start;
`

export const Header = styled.View`
  flex-direction: row;
`

export const TitleText = styled.Text`
  font-size: ${theme.metrics.px(40)}px;
  fon-weight: bold;
  margin-bottom: ${theme.metrics.px(20)}px;
  margin-top: ${theme.metrics.px(19)}px;
  margin-left: ${theme.metrics.px(20)}px;
  color: ${props => props.theme.text};
`

export const TextApp = styled.Text`
  font-size: ${theme.metrics.px(18)}px;
  font-weight: bold;
  margin-bottom: ${theme.metrics.px(10)}px;
  color: ${props => props.theme.text};
`
export const LogoutButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${theme.metrics.px(40)}px;
  border-radius: ${theme.metrics.px(8)}px;
  border-width: ${theme.metrics.px(2)}px;
  border-color: ${props => props.theme.yellow};
  align-items: center;
  align-self: center;
  width: ${theme.metrics.px(275)}px;
  height: ${theme.metrics.px(30)}px;
`;

export const LogoutButtonText = styled.Text`
  color: ${props => props.theme.text};
  font-size: ${theme.metrics.px(18)}px;
  top: ${theme.metrics.px(2)}px;
`;

export const styles = StyleSheet.create({
  return: {
    marginTop: 25,
  },
});
