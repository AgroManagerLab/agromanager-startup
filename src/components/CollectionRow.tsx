import React from 'react';
import { View, Text } from 'react-native';
import { PhotoStripe } from './PhotoStripe';
import { SyncBadge } from './SyncBadge';
import { NumText } from './NumText';
import type { Collection } from '../types';
import { styles } from './styles';

interface CollectionRowProps {
  row: Collection;
  variant?: 'compact' | 'detailed';
  pricePerLiter?: number;
}

export function CollectionRow({ row, variant = 'compact', pricePerLiter = 0 }: CollectionRowProps) {
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
            <SyncBadge state={row.status} />
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
