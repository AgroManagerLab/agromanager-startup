import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, FONT } from '../../../global/theme';

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
  const containerStyle = {
    width: size,
    height: size,
  };

  const textStyle = {
    color,
    fontSize: size * 0.72,
    lineHeight: size * 0.72,
  };

  return (
    <View style={[styles.placeholderContainer, containerStyle]}>
      {/* TODO: substituir por asset vetorial dedicado quando o pacote visual estiver pronto. */}
      <Text style={[styles.placeholderText, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: FONT.uiBold,
  },
});
