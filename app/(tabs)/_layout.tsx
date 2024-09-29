import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Spotify',
          tabBarIcon: ({ color, focused }) => (
            <Entypo size={32} name={focused ? 'spotify' : 'spotify-with-circle'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="youtube"
        options={{
          title: 'Youtube',
          tabBarIcon: ({ color, focused }) => (
            <Entypo size={32} name={focused ? 'youtube' : 'youtube-with-circle'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
      name="config"
      options={{
        title: 'Configurações',
        tabBarIcon: ({ color, focused }) => (
          <Entypo size={32} name={focused ? 'tools' : 'tools'} color={color} />
        ),
      }}
    />
    </Tabs>
  );
}
