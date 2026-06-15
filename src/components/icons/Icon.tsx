import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../global/themes';

export interface IconProps {
  size?: number;
  color?: string;
}

export function HomeIcon({ size = 24, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z"
        stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M9 21V12h6v9" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function HistoryIcon({ size = 24, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 8v4l3 3" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M3.05 12a9 9 0 111.64 5M3 21v-4h4" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SettingsIcon({ size = 24, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001.08 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1.08z"
        stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function WalletIcon({ size = 24, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 12v4a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v4z" stroke={color}
        strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M17 14a1 1 0 100-2 1 1 0 000 2z" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CheckIcon({ size = 22, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path d="M5 11l4 4 8-8" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function InfoIcon({ size = 14, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M7 10V7M7 4.5h.005" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M7 13A6 6 0 107 1a6 6 0 000 12z" stroke={color} strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PlusIcon({ size = 24, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function UsersIcon({ size = 24, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M9 11a4 4 0 100-8 4 4 0 000 8z" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
        stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CameraIcon({ size = 24, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
        stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M12 17a4 4 0 100-8 4 4 0 000 8z" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SearchIcon({ size = 22, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M10 17a7 7 0 100-14 7 7 0 000 14zM21 21l-4.35-4.35" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function EditIcon({ size = 22, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M11 3H4a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1v-7"
        stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevronIcon({ size = 14, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M5 3l4 4-4 4" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function RouteIcon({ size = 24, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-5.5 8-11.5a8 8 0 10-16 0c0 6 8 11.5 8 11.5z" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M12 14a3 3 0 100-6 3 3 0 000 6z" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TruckIcon({ size = 24, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 17h2M22 17h1V9l-4-4h-5v12M1 17a2 2 0 104 0M1 17V7a2 2 0 012-2h11v12"
        stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M20 17a2 2 0 11-4 0M18 5v4h4" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LogoutIcon({ size = 22, color = colors.ink }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M14 16l4-4-4-4M18 12H7" stroke={color} strokeWidth={1.8} strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 18H4a1 1 0 01-1-1V5a1 1 0 011-1h10" stroke={color} strokeWidth={1.8}
        strokeLinecap="round" strokeLinejoin="round"
      />
    </Svg>
  );
}
