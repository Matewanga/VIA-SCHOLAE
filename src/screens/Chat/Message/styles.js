import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import { theme } from '../../../styles'
import { Bubble, InputToolbar, Send } from 'react-native-gifted-chat'
import { Ionicons } from '@expo/vector-icons'

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  position: relative;
`

export const Header = styled.View`
  background: ${(props) => props.theme.primary};
  padding: ${theme.metrics.px(13)}px;
  flex-direction: row;
  width: ${theme.metrics.px(350)}px;
  height: ${theme.metrics.px(65)}px;
  border-radius: ${theme.metrics.px(40)}px;
  position: absolute;
  margin-left: ${theme.metrics.px(40)}px;
  margin-top: ${theme.metrics.px(35)}px;
  elevation: 5;
  shadow-color: #262626;
  shadow-offset: 1px 5px;
  shadow-opacity: 1;
  shadow-radius: 10px;
`

export const HeaderInfo = styled.View``

export const Name = styled.Text`
  font-size: ${theme.metrics.px(25)}px;
  color: ${(props) => props.theme.text};
  margin-left: ${theme.metrics.px(12)}px;
  margin-top: ${theme.metrics.px(-4)}px;
  margin-bottom: ${theme.metrics.px(1)}px;
`

export const SubTitles = styled.Text`
  align-self: flex-start;
  padding-left: ${theme.metrics.px(12)}px;
  color: ${(props) => props.theme.textsecondary};
`

export const styles = StyleSheet.create({
  back: {
    marginTop: 5,
  },
  pic: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginTop: -6,
  },
})

export const renderCustomBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#595959',
          padding: 5,
          borderRadius: 20,
        },
        left: {
          backgroundColor: '#E4E6EB',
          padding: 10,
          borderRadius: 15,
        },
      }}
      textStyle={{
        right: {
          color: '#EEEEEE',
        },
        left: {
          color: '#000000',
        },
      }}
    />
  )
}

export const renderCustomInputToolbar = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#f4f4f4',
        borderTopWidth: 0,
        borderRadius: 25,
        marginHorizontal: 10,
        marginBottom: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        paddingHorizontal: 15,
        height: 49,
        justifyContent: 'center',
      }}
      textInputStyle={{
        color: '#262626',
        fontSize: 16, // Tamanho do texto
        padding: 0,
        height: '100%',
        textAlignVertical: 'center', // Para centralizar o texto verticalmente
      }}
    />
  )
}

export const renderCustomSend = (props) => {
  return (
    <Send
      {...props}
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      }}
    >
      <Ionicons
        name="send"
        size={24}
        color="#E9B224"
        style={{
          margin: 0,
          padding: 0,
        }}
      />
    </Send>
  )
}
