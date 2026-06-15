import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../global/themes';

interface IconProps {
  size?: number;
  color?: string;
}

export function MailIcon({ size = 20, color = colors.ink3 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M18 6l-8 5L2 6" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LockIcon({ size = 20, color = colors.ink3 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5 9V6a5 5 0 0110 0v3M3 9h14a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1v-7a1 1 0 011-1z"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M10 12v3" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AlertIcon({ size = 20, color = colors.danger }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 3L1 17h18L10 3z" stroke={color} strokeWidth={1.5} strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 9v3M10 14.5h.005" stroke={color} strokeWidth={1.5} strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
