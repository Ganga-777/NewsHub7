import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Home, Search, Bookmark, Settings } from 'lucide-react-native';
import { useSettingsStore } from '@/stores/settingsStore';
import { colors } from '@/constants/colors';

export default function TabLayout() {
  const { isDarkMode } = useSettingsStore();
  
  const backgroundColor = isDarkMode ? colors.darkBackground : colors.background;
  const textColor = isDarkMode ? colors.darkText : colors.text;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: isDarkMode ? colors.darkTextSecondary : colors.textSecondary,
        tabBarStyle: {
          backgroundColor: isDarkMode ? colors.darkCard : colors.card,
          borderTopColor: isDarkMode ? colors.darkBorder : colors.border,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          height: Platform.OS === 'ios' ? 85 : 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: isDarkMode ? colors.darkCard : colors.card,
          borderBottomColor: isDarkMode ? colors.darkBorder : colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: textColor,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'Telugu News',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size }) => <Bookmark size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}