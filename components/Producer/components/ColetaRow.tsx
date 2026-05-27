import React from 'react';
import { View, Text } from 'react-native';
import { PhotoStripe } from '../../shared/ui/PhotoStripe';
import { SyncBadge } from '../../shared/ui/SyncBadge';
import { NumText } from '../../shared/ui/NumText';
import { Coleta } from '../types';
import { styles } from '../styles';

interface ColetaRowProps {
  row: Coleta;
  variant?: 'compact' | 'detailed';
  pricePerLiter?: number;
}

export function ColetaRow({ row, variant = 'compact', pricePerLiter = 0 }: ColetaRowProps) {
  if (variant === 'detailed') {
    const value = row.volume * pricePerLiter;
    return (
      <View style={styles.coletaDetailedRow}>
        <PhotoStripe variant="md" />
        <View style={styles.coletaInfo}>
          <Text style={styles.coletaDetailedDate}>{row.date}</Text>
          <View style={styles.coletaDetailedMeta}>
            <NumText style={styles.coletaDetailedTime}>{row.time}</NumText>
            <View style={styles.coletaDot} />
            <SyncBadge state="synced" />
          </View>
        </View>
        <View style={styles.coletaDetailedRight}>
          <NumText style={styles.coletaDetailedVolume}>
            {row.volume} <Text style={styles.coletaUnit}>L</Text>
          </NumText>
          <NumText style={styles.coletaDetailedValue}>
            R$ {value.toFixed(2).replace('.', ',')}
          </NumText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.coletaCompactRow}>
      <PhotoStripe variant="sm" />
      <View style={styles.coletaInfo}>
        <Text style={styles.coletaCompactDate}>{row.date}</Text>
        <NumText style={styles.coletaCompactTime}>{row.time}</NumText>
      </View>
      <NumText style={styles.coletaCompactVolume}>
        {row.volume} <Text style={styles.coletaUnit}>L</Text>
      </NumText>
    </View>
  );
}
