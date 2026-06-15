import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList, UserProfile } from '../types';
import { useAuth } from '../context/AuthContext';
import { ProducerTabs } from '../pages/ProducerTabs';
import { AdminTabs } from '../pages/AdminTabs';
import { MilkmanTabs } from '../pages/MilkmanTabs';
import { MilkmanRegistroColetaPage } from '../pages/MilkmanRegistroColeta';
import { AdminCadastroProdutorPage } from '../pages/AdminCadastroProdutor';
import { AdminCadastroRotaPage } from '../pages/AdminCadastroRota';
import { AdminCadastroLeiteiroPage } from '../pages/AdminCadastroLeiteiro';
import { AdminDetalhamentoProdutorPage } from '../pages/AdminDetalhamentoProdutor';

type RouteName = keyof RootStackParamList;

const ROUTE_BY_PROFILE: Record<UserProfile, RouteName> = {
  producer: 'ProducerTabs',
  admin: 'AdminTabs',
  milkman: 'MilkmanTabs',
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { profile } = useAuth();
  const initialRoute: RouteName = profile ? ROUTE_BY_PROFILE[profile] : 'ProducerTabs';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="ProducerTabs" component={ProducerTabs} />
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="MilkmanTabs" component={MilkmanTabs} />
      <Stack.Screen name="MilkmanRegistroColeta" component={MilkmanRegistroColetaPage} />
      <Stack.Screen name="AdminCadastroProdutor" component={AdminCadastroProdutorPage} />
      <Stack.Screen name="AdminCadastroRota" component={AdminCadastroRotaPage} />
      <Stack.Screen name="AdminCadastroLeiteiro" component={AdminCadastroLeiteiroPage} />
      <Stack.Screen name="AdminDetalhamentoProdutor" component={AdminDetalhamentoProdutorPage} />
    </Stack.Navigator>
  );
}
