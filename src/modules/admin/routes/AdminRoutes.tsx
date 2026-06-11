import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type { RootStackParamList } from '../../../global/@types/navigation';
import { AdminHomePage } from '../pages/AdminHomePage';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Scaffold do módulo Admin: navegação própria, mesmo que hoje tenha uma tela só.
export function AdminRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Admin" component={AdminHomePage} />
    </Stack.Navigator>
  );
}
