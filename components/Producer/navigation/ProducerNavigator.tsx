import React from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ProducerHomeScreen } from '../screens/ProducerHomeScreen';
import { ProducerHistoryScreen } from '../screens/ProducerHistoryScreen';
import { TabBar, TabItem } from '../../shared/ui/TabBar';
import { HomeIcon, HistoryIcon } from '../../shared/ui/icons/Icon';

const Tab = createBottomTabNavigator();

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

export function ProducerNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <ProducerTabBar {...props} />}>
      <Tab.Screen name="Inicio" component={ProducerHomeScreen} />
      <Tab.Screen name="Historico" component={ProducerHistoryScreen} />
    </Tab.Navigator>
  );
}
