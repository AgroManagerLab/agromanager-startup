import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList, UserProfile } from '../types';
import { useAuth } from '../context/AuthContext';
import { ProducerTabs } from '../pages/ProducerTabs';
import { AdminTabs } from '../pages/AdminTabs';
import { MilkmanTabs } from '../pages/MilkmanTabs';
import { MilkmanRegisterCollectionPage } from '../pages/MilkmanRegisterCollection';
import { AdminRegisterProducerPage } from '../pages/AdminRegisterProducer';
import { AdminRegisterRoutePage } from '../pages/AdminRegisterRoute';
import { AdminRegisterMilkmanPage } from '../pages/AdminRegisterMilkman';
import { AdminProducerDetailPage } from '../pages/AdminProducerDetail';
import { AdminMilkmanListPage } from '../pages/AdminMilkmanList';
import { AdminMilkmanDetailPage } from '../pages/AdminMilkmanDetail';
import { ProducerCollectionDetailPage } from '../pages/ProducerCollectionDetail';
import { MilkmanCollectionDetailPage } from '../pages/MilkmanCollectionDetail';

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
      <Stack.Screen name="MilkmanRegisterCollection" component={MilkmanRegisterCollectionPage} />
      <Stack.Screen name="AdminRegisterProducer" component={AdminRegisterProducerPage} />
      <Stack.Screen name="AdminRegisterRoute" component={AdminRegisterRoutePage} />
      <Stack.Screen name="AdminRegisterMilkman" component={AdminRegisterMilkmanPage} />
      <Stack.Screen name="AdminProducerDetail" component={AdminProducerDetailPage} />
      <Stack.Screen name="AdminMilkmanList" component={AdminMilkmanListPage} />
      <Stack.Screen name="AdminMilkmanDetail" component={AdminMilkmanDetailPage} />
      <Stack.Screen name="ProducerCollectionDetail" component={ProducerCollectionDetailPage} />
      <Stack.Screen name="MilkmanCollectionDetail" component={MilkmanCollectionDetailPage} />
    </Stack.Navigator>
  );
}
