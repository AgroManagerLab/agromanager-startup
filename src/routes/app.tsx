import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { ProducerTabs } from '../pages/ProducerTabs';
import { AdminHomePage } from '../pages/AdminHome';
import { MilkmanHomePage } from '../pages/MilkmanHome';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProducerTabs" component={ProducerTabs} />
      <Stack.Screen name="Admin" component={AdminHomePage} />
      <Stack.Screen name="Milkman" component={MilkmanHomePage} />
    </Stack.Navigator>
  );
}
