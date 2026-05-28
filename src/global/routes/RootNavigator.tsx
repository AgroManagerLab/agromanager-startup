import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../@types/navigation';
import { LoginPage } from '../../modules/auth/pages/LoginPage';
import { ProducerRoutes } from '../../modules/producer/routes/ProducerRoutes';
import { AdminRoutes } from '../../modules/admin/routes/AdminRoutes';
import { MilkmanRoutes } from '../../modules/milkman/routes/MilkmanRoutes';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Stack raiz: Login direciona para o navigator do perfil autenticado (REQ-01.5).
export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Producer" component={ProducerRoutes} />
      <Stack.Screen name="Admin" component={AdminRoutes} />
      <Stack.Screen name="Milkman" component={MilkmanRoutes} />
    </Stack.Navigator>
  );
}
