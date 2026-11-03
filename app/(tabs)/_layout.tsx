import React from 'react';
import { Tabs } from 'expo-router';
import { COLORS } from '../../src/styles/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerShadowVisible: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          borderTopColor: COLORS.border,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Beranda' }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: 'Favorit' }}
      />
      <Tabs.Screen
        name="create"
        options={{ title: 'Tulis Baru' }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'Pengaturan' }}
      />
    </Tabs>
  );
}