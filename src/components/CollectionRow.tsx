import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PhotoStripe } from './PhotoStripe';
import { SyncBadge } from './SyncBadge';
import { NumText } from './NumText';
import type { Collection } from '../types';
import { styles } from './styles';

interface CollectionRowProps {
  row: Collection;
  variant?: 'compact' | 'detailed';
  pricePerLiter?: number;
  onPress?: () => void;
}

export function CollectionRow({
  row,
  variant = 'compact',
  pricePerLiter = 0,
  onPress,
}: CollectionRowProps) {
  const content =
    variant === 'detailed' ? (
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
            R$ {(row.volume * pricePerLiter).toFixed(2).replace('.', ',')}
          </NumText>
        </View>
      </View>
    ) : (
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

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}
