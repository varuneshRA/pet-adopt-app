import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from "./../../constants/Colors"

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor:Colors.PRIMARY
    }}
    >
        <Tabs.Screen name='home'
        options={{
          title:'Home',
          headerShown:false,
          tabBarIcon:({color})=><FontAwesome name="home" size={24} color={color} />
        }}/>
        <Tabs.Screen name='favorite'
        options={{
          title:'Favorite',
          headerShown:false,
          tabBarIcon:({color})=><FontAwesome name="heart" size={24} color={color} />
        }}/>
        <Tabs.Screen name='inbox'
        options={{
          title:'Chat',
          headerShown:false,
          tabBarIcon:({color})=><Ionicons name="chatbubble-ellipses-sharp" size={24} color={color} />
        }}/>
        <Tabs.Screen name='profile'
        options={{
          title:'Profile',
          headerShown:false,
          tabBarIcon:({color})=><Ionicons name="people" size={24} color={color} />
        }}/>

    </Tabs>
  )
}