import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../global/themes';

export interface IconProps {
  size?: number;
  color?: string;
}

function PlaceholderIcon({ size = 24, color = colors.ink, label }: IconProps & { label: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* TODO: substituir por asset vetorial dedicado quando o pacote visual estiver pronto. */}
      <Text style={{ color, fontSize: size * 0.7, lineHeight: size * 0.7, fontFamily: 'Manrope_700Bold' }}>
        {label}
      </Text>
    </View>
  );
}

export function HomeIcon({ size = 24, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="⌂" />;
}

export function HistoryIcon({ size = 24, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="↺" />;
}

export function SettingsIcon({ size = 24, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="⚙" />;
}

export function WalletIcon({ size = 24, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="¤" />;
}

export function CheckIcon({ size = 22, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="✓" />;
}

export function InfoIcon({ size = 14, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="i" />;
}

export function PlusIcon({ size = 24, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="+" />;
}

export function UsersIcon({ size = 24, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="👥" />;
}

export function CameraIcon({ size = 24, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="📷" />;
}

export function SearchIcon({ size = 22, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="🔍" />;
}

export function EditIcon({ size = 22, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="✎" />;
}

export function ChevronIcon({ size = 14, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="›" />;
}

export function RouteIcon({ size = 24, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="⇢" />;
}

export function TruckIcon({ size = 24, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="🚛" />;
}

export function LogoutIcon({ size = 22, color = colors.ink }: IconProps) {
  return <PlaceholderIcon size={size} color={color} label="↩" />;
}
