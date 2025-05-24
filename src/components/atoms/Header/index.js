import React from 'react'
import { Container, Branding, PageTitle, TopRow } from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'styled-components/native';

export const Header = ({ title, bgColor, txtColor, color }) => {
  const theme = useTheme()

  const iconColor = color?.startsWith('#') ? color : theme[color] || '#fff'

  return (
    <Container bgColor={bgColor}>
      <TopRow>
        <Icon name="menu" size={28} color={iconColor} />
        <Branding txtColor={txtColor}>Via Scholae</Branding>
      </TopRow>
      <PageTitle>{title}</PageTitle>
    </Container>
  )
}
