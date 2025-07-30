import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Container, Branding, PageTitle, TopRow, LeftBox, RightBox } from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'

export const Header = ({
  title,
  bgColor,
  mb,
  txtColor,
  color = "black",
  iconName = 'menu',
  onIconPress,
  showBranding = true,
  showTitle = true,
  logoSource = null,
  logoSize = 52,
  size = 28,
  height,
  children
}) => {
  const theme = useTheme()
  const iconColor = color?.startsWith('#') ? color : theme[color] || '#EEEEEE'

  return (
    <Container bgColor={bgColor} height={height} mb={mb}>
      <TopRow>
        <TouchableOpacity>
          <LeftBox>
            <Icon
              name={iconName}
              size={size}
              color={iconColor}
              onPress={onIconPress}
            />
          </LeftBox>
        </TouchableOpacity>

        {showBranding && <Branding txtColor={txtColor}>Via Scholae</Branding>}

        <RightBox>
          {logoSource && (
            <Image
              source={logoSource}
              style={{ width: logoSize, height: logoSize, resizeMode: 'contain' }}
            />
          )}
        </RightBox>
      </TopRow>

      {showTitle && <PageTitle>{children}</PageTitle>}
    </Container>
  )
}