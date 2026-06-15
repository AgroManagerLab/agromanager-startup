import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TabBar, ProfilePlaceholder } from '../components';
import type { TabItem } from '../components';

type ScreenEntry = [string, React.ComponentType<any>];

export function createProfileTabs(
  tabItems: TabItem[],
  screens: ScreenEntry[],
) {
  const Tab = createBottomTabNavigator();

  function ProfileTabBar({ state, navigation }: BottomTabBarProps) {
    return (
      <TabBar
        items={tabItems}
        activeIndex={state.index}
        onSelect={(index) => {
          const route = state.routes[index];
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (state.index !== index && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }}
      />
    );
  }

  return function ProfileTabs() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <ProfileTabBar {...props} />}>
        {screens.map(([name, component]) => (
          <Tab.Screen key={name} name={name} component={component} />
        ))}
      </Tab.Navigator>
    );
  };
}

export const PERFIL_SCREEN: ScreenEntry = ['Perfil', ProfilePlaceholder];
