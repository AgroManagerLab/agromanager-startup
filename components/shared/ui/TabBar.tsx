import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette } from '../../../theme/palette';

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
    <View
      className="flex-row bg-surface border-t border-border pt-2 px-2"
      style={{ paddingBottom: insets.bottom + 8 }}
    >
      {items.map((item, i) => {
        const active = i === activeIndex;
        const color = active ? palette.primary : palette.ink3;
        return (
          <Pressable key={item.key} onPress={() => onSelect(i)} className="flex-1 items-center py-1.5 gap-1">
            <View className="h-6 justify-center">{item.renderIcon(color)}</View>
            <Text className={`text-xs ${active ? 'font-ui-extrabold text-primary' : 'font-ui-semibold text-ink3'}`}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
