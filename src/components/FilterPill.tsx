import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, FONT } from '../global/themes';

interface FilterPillProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  count?: number;
  style?: ViewStyle;
}

export function FilterPill({ label, active, onPress, count, style }: FilterPillProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[{
        flexShrink: 0,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: colors.radii.pill,
        backgroundColor: active ? colors.ink : colors.surface,
        borderWidth: active ? 0 : 1,
        borderColor: colors.border,
      }, style]}
    >
      <Text style={{
        fontFamily: active ? FONT.uiBold : FONT.uiBold,
        fontSize: 13.5,
        color: active ? colors.contrast : colors.ink,
        letterSpacing: -0.1,
      }}>
        {label}
        {count !== undefined ? (
          <Text style={{ fontFamily: FONT.monoBold, marginLeft: 4 }}> {count}</Text>
        ) : null}
      </Text>
    </TouchableOpacity>
  );
}
