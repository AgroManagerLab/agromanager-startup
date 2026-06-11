import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type { RootStackParamList } from '../../../global/@types/navigation';
import { MilkmanHomePage } from '../pages/MilkmanHomePage';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Scaffold do módulo Milkman: navegação própria, mesmo que hoje tenha uma tela só.
export function MilkmanRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Milkman" component={MilkmanHomePage} />
    </Stack.Navigator>
  );
}
