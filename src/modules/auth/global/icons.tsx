import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../../global/theme';

interface IconProps {
  size?: number;
  color?: string;
}

export function MailIcon({ size = 20, color = colors.ink3 }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="✉" />;
}

export function LockIcon({ size = 20, color = colors.ink3 }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="⌄" />;
}

export function AlertIcon({ size = 20, color = colors.danger }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="!" />;
}

function PlaceholderIcon({ size = 20, color = colors.ink3, label }: IconProps & { label: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* TODO: substituir por asset vetorial dedicado quando o pacote visual estiver pronto. */}
      <Text style={{ color, fontSize: size * 0.72, lineHeight: size * 0.72, fontFamily: 'Manrope_700Bold' }}>
        {label}
      </Text>
    </View>
  );
}
