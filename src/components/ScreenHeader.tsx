import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, subtitle, onBack, right }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 8 }]}>
      <View style={styles.headerRow}>
        {onBack ? (
          <TouchableOpacity activeOpacity={0.7} onPress={onBack} style={styles.headerBackBtn}>
            {/* TODO: substituir por asset vetorial dedicado quando o pacote visual estiver pronto. */}
            <Text style={styles.headerBackText}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerSpacer} />
        )}
        {right ?? <View style={styles.headerSpacer} />}
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}
