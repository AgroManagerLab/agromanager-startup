import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingsIcon } from './icons/Icon';
import { colors, FONT } from '../global/themes';

export function PerfilPlaceholder() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + 60, alignItems: 'center', paddingHorizontal: 20 }}>
      <SettingsIcon size={48} color={colors.ink3} />
      <Text style={{ fontFamily: FONT.uiExtra, fontSize: 20, color: colors.ink, marginTop: 16, letterSpacing: -0.4 }}>
        Perfil
      </Text>
      <Text style={{ fontFamily: FONT.ui, fontSize: 14, color: colors.ink3, marginTop: 6, textAlign: 'center' }}>
        Em breve
      </Text>
    </View>
  );
}
