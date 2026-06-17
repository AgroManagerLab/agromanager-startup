import React from 'react';
import { Text, View } from 'react-native';
import { useConnectivity } from '../context/ConnectivityContext';
import { styles } from './styles';

interface OfflineBannerProps {
  pendingCount?: number;
}

export function OfflineBanner({ pendingCount = 0 }: OfflineBannerProps) {
  const { isConnected } = useConnectivity();

  if (isConnected) return null;

  return (
    <View style={styles.offlineBanner}>
      <View style={styles.offlineIcon}>
        <View style={styles.offlineIconLine} />
      </View>
      <Text style={styles.offlineText}>
        Sem conexão · {pendingCount} coleta{pendingCount !== 1 ? 's' : ''} para sincronizar
      </Text>
      <Text style={styles.offlineLabel}>OFFLINE</Text>
    </View>
  );
}
