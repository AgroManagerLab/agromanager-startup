import React from 'react';
import { View, Text } from 'react-native';
import { CheckIcon } from './icons/Icon';
import { palette } from '../../../theme/palette';

interface SyncBadgeProps {
  state?: 'synced' | 'pending';
}

export function SyncBadge({ state = 'synced' }: SyncBadgeProps) {
  const pending = state === 'pending';
  return (
    <View
      className={`flex-row items-center self-start rounded-full gap-1.5 py-1 pl-2 pr-2.5 ${
        pending ? 'bg-pendingBg' : 'bg-syncBg'
      }`}
    >
      {pending ? (
        <View className="w-2 h-2 rounded-full bg-pending" />
      ) : (
        <CheckIcon size={11} color={palette.syncOk} />
      )}
      <Text className={`font-ui-bold text-sm ${pending ? 'text-pendingInk' : 'text-syncInk'}`}>
        {pending ? 'Pendente' : 'Sincronizada'}
      </Text>
    </View>
  );
}
