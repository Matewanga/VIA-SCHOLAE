import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import { theme } from '../../../styles'
import { Bubble, InputToolbar, Send } from 'react-native-gifted-chat'
import { Ionicons } from '@expo/vector-icons'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 120px;
  background-color: #0e194d;
  padding: 10px 15px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

export const LeftBox = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`

export const BackButton = styled.TouchableOpacity`
  padding: 5px;
`

export const UserAvatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  margin-left: 10px;
`

export const UserName = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
`
export const renderCustomBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#D9D9D9',
          padding: 10,
          borderRadius: 20,
          marginVertical: 2,
          marginRight: 2,
        },
        left: {
          backgroundColor: '#F1F0F0',
          padding: 10,
          borderRadius: 20,
          marginVertical: 2,
          marginLeft: 2,
        },
      }}
      textStyle={{
        right: {
          color: '#000',
        },
        left: {
          color: '#000',
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
        borderRadius: 15,
        marginHorizontal: 10,
        marginBottom: 20,
        elevation: 3,
        paddingHorizontal: 15,
        height: 55,
        width: 330,
        justifyContent: 'center',
        alignSelf: 'center',
      }}
      textInputStyle={{
        color: '#262626',
        fontSize: 16,
        padding: 0,
        height: '100%',
        textAlignVertical: 'center',
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
        color="#000000"
        style={{
          margin: 0,
          padding: 0,
        }}
      />
    </Send>
  )
}
