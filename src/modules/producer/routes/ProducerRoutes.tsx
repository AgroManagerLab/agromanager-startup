import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ProducerHomePage } from '../pages/ProducerHomePage';
import { ProducerHistoryPage } from '../pages/ProducerHistoryPage';
import { TabBar, TabItem, HomeIcon, HistoryIcon } from '../../../global/ui';

export type ProducerNavigatorParamList = {
  Inicio: undefined;
  Historico: undefined;
};

const Tab = createBottomTabNavigator<ProducerNavigatorParamList>();

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

export function ProducerRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <ProducerTabBar {...props} />}>
      <Tab.Screen name="Inicio" component={ProducerHomePage} />
      <Tab.Screen name="Historico" component={ProducerHistoryPage} />
    </Tab.Navigator>
  );
}
