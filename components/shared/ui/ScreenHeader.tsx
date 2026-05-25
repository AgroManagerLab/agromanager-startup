import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { palette } from '../../../theme/palette';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, subtitle, onBack, right }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View className="px-5 pb-3" style={{ paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center justify-between h-11">
        {onBack ? (
          <Pressable onPress={onBack} className="w-11 h-11 items-center justify-center">
            <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
              <Path d="M14 4l-7 7 7 7" stroke={palette.ink} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
        ) : (
          <View className="w-11" />
        )}
        {right ?? <View className="w-11" />}
      </View>
      <Text className="font-ui-extrabold text-5xl text-ink tracking-tight mt-1.5">{title}</Text>
      {subtitle ? (
        <Text className="font-ui text-lg text-ink2 mt-1.5">{subtitle}</Text>
      ) : null}
    </View>
  );
}
