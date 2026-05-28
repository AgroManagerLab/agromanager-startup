import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors } from '../../../global/theme';

interface IconProps {
  size?: number;
  color?: string;
}

export function MailIcon({ size = 20, color = colors.ink3 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth={1.8}>
      <Rect x={2} y={4} width={16} height={12} rx={2} />
      <Path d="M2 6l8 5 8-5" />
    </Svg>
  );
}

export function LockIcon({ size = 20, color = colors.ink3 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth={1.8}>
      <Rect x={3} y={9} width={14} height={9} rx={2} />
      <Path d="M6 9V6a4 4 0 018 0v3" />
    </Svg>
  );
}

export function AlertIcon({ size = 20, color = colors.danger }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth={2}>
      <Path d="M10 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z" />
      <Path d="M10 6v5M10 13.5v.5" strokeLinecap="round" />
    </Svg>
  );
}
