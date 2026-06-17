import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../global/themes';
import { styles } from './styles';

export interface TabItem {
  key: string;
  label: string;
  renderIcon: (color: string) => React.ReactNode;
}

interface TabBarProps {
  items: TabItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function TabBar({ items, activeIndex, onSelect }: TabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom + 8 }]}>
      {items.map((item, i) => {
        const active = i === activeIndex;
        const color = active ? colors.primary : colors.ink3;
        return (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.7}
            onPress={() => onSelect(i)}
            style={styles.tabBarItem}
          >
            <View style={styles.tabBarIconWrap}>{item.renderIcon(color)}</View>
            <Text style={active ? styles.tabBarLabelActive : styles.tabBarLabelInactive}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
