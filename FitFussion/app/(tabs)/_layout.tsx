import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7de7ff',
        tabBarInactiveTintColor: '#52667a',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#0b1c2d',
          borderColor: '#173b57',
          borderTopWidth: 1,
          height: Platform.select({ ios: 86, default: 72 }),
          marginHorizontal: 14,
          marginBottom: Platform.select({ ios: 10, default: 12 }),
          borderRadius: 8,
          paddingBottom: Platform.select({ ios: 22, default: 10 }),
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '800',
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="running"
        options={{
          title: 'Run',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="figure.run" color={color} />,
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: 'Workout',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="dumbbell.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="clock.arrow.circlepath" color={color} />,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Rank',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="trophy.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
