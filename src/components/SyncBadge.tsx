import React from 'react';
import { View, Text } from 'react-native';
import { CheckIcon } from './icons/Icon';
import { colors } from '../global/themes';
import { styles } from './styles';

interface SyncBadgeProps {
  state?: 'synced' | 'pending';
}

export function SyncBadge({ state = 'synced' }: SyncBadgeProps) {
  const pending = state === 'pending';
  return (
    <View style={[styles.syncBadge, pending ? styles.syncBadgePending : styles.syncBadgeOk]}>
      {pending ? (
        <View style={styles.syncBadgeDot} />
      ) : (
        <CheckIcon size={11} color={colors.syncOk} />
      )}
      <Text style={pending ? styles.syncBadgeTextPending : styles.syncBadgeTextOk}>
        {pending ? 'Pendente' : 'Registrada'}
      </Text>
    </View>
  );
}
