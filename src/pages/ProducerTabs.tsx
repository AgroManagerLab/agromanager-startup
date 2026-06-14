import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ProducerHomePage } from './ProducerHome';
import { ProducerHistoryPage } from './ProducerHistory';
import { TabBar, HomeIcon, HistoryIcon } from '../components';
import type { TabItem } from '../components';

export type ProducerTabParamList = {
  Inicio: undefined;
  Historico: undefined;
};

const Tab = createBottomTabNavigator<ProducerTabParamList>();

const TAB_ITEMS: TabItem[] = [
  { key: 'Inicio', label: 'Início', renderIcon: (c) => <HomeIcon size={24} color={c} /> },
  { key: 'Historico', label: 'Histórico', renderIcon: (c) => <HistoryIcon size={24} color={c} /> },
];

function ProducerTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <TabBar
      items={TAB_ITEMS}
      activeIndex={state.index}
      onSelect={(index) => {
        const route = state.routes[index];
        const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
        if (state.index !== index && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      }}
    />
  );
}

export function ProducerTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <ProducerTabBar {...props} />}>
      <Tab.Screen name="Inicio" component={ProducerHomePage} />
      <Tab.Screen name="Historico" component={ProducerHistoryPage} />
    </Tab.Navigator>
  );
}
