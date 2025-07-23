import React from 'react'
import { Image } from 'react-native'
import { Container, Branding, PageTitle, TopRow, LeftBox, RightBox } from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'

export const Header = ({
  title,
  bgColor,
  mb,
  txtColor,
  color,
  iconName = 'menu',
  onIconPress,
  showBranding = true,
  showTitle = true,
  logoSource = null,
  logoSize = 52,
  height,
  children
}) => {
  const theme = useTheme()
  const iconColor = color?.startsWith('#') ? color : theme[color] || '#EEEEEE'

  return (
    <Container bgColor={bgColor} height={height} mb={mb}>
      <TopRow>
        <LeftBox>
          <Icon
            name={iconName}
            size={28}
            color={iconColor}
            onPress={onIconPress}
          />
        </LeftBox>

        {showBranding && <Branding txtColor={txtColor}>{children}</Branding>}

        <RightBox>
          {logoSource && (
            <Image
              source={logoSource}
              style={{ width: logoSize, height: logoSize, resizeMode: 'contain' }}
            />
          )}
        </RightBox>
      </TopRow>

      {showTitle && <PageTitle>{title}</PageTitle>}
    </Container>
  )
}