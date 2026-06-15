import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogoutIcon } from './icons/Icon';
import { Card } from './Card';
import { useAuth } from '../context/AuthContext';
import { colors, FONT } from '../global/themes';

const PROFILE_LABEL: Record<string, string> = {
  admin: 'Administrador',
  milkman: 'Leiteiro',
  producer: 'Produtor',
};

export function ProfilePlaceholder() {
  const insets = useSafeAreaInsets();
  const { signOut, profile, userId } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + 60, paddingHorizontal: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: 28 }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.primarySoft,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <Text style={{ fontFamily: FONT.uiExtra, fontSize: 28, color: colors.primaryDark }}>
            {profile ? profile[0].toUpperCase() : '?'}
          </Text>
        </View>
        <Text style={{ fontFamily: FONT.uiExtra, fontSize: 22, color: colors.ink, letterSpacing: -0.5 }}>
          {profile ? PROFILE_LABEL[profile] : '—'}
        </Text>
        <Text style={{ fontFamily: FONT.ui, fontSize: 14, color: colors.ink3, marginTop: 4 }}>
          {userId}
        </Text>
      </View>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={signOut}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            padding: 18,
          }}
        >
          <LogoutIcon size={22} color={colors.danger} />
          <Text style={{ fontFamily: FONT.uiBold, fontSize: 16, color: colors.danger }}>
            Sair da conta
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}
