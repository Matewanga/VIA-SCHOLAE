import React from 'react'
import { IconUser, IconHome, IconMessage, IconSearch } from '../../assets/icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Initial,
  Login,
  Account,
  EditChildren,
  Home,
  Message,
  Chat,
  Register,
  RegisterRoute,
  TermosdeUso,
  Search,
  Settings,
  RegisterMotorista,
  RegisterCrianca,
  ExibirCriancas,
  PerfilSearch,
  ManageRoute,
  EditUser,
  EditRoute,
  Acessibility,
  YourAccount,
  SeatRequests,
} from '../screens'

export const BottomRoute = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarIcon: ({ color, size }) => {
          const props = { width: size, height: size, color }

          switch (route.name) {
            case 'Home':
              return <IconHome {...props} />
            case 'Mensagens':
              return <IconMessage {...props} />
            case 'Pesquisa':
              return <IconSearch {...props} />
            case 'Perfil':
              return <IconUser {...props} />
          }
        },

        tabBarActiveTintColor: '#262626',
        tabBarInactiveTintColor: '#565656',

        tabBarStyle: {
          height: 60,
          backgroundColor: '#FFFFFF',

          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,

          borderTopWidth: 1,
          borderTopColor: '#000000',


          borderRadius: 0,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Mensagens"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Pesquisa"
        component={Search}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Perfil"
        component={Account}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

// Routes.js
export const Routes = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Initial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterMotorista"
        component={RegisterMotorista}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterCrianca"
        component={RegisterCrianca}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainHome"
        component={BottomRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainChat"
        component={BottomRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainSearch"
        component={BottomRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainAccount"
        component={BottomRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermosdeUso"
        component={TermosdeUso}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExibirCriancas"
        component={ExibirCriancas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PerfilSearch"
        component={PerfilSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditChildren"
        component={EditChildren}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterRoute"
        component={RegisterRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageRoute"
        component={ManageRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditRoute"
        component={EditRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Acessibility"
        component={Acessibility}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SeatRequests"
        component={SeatRequests}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
