import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PhotoStripe } from '../../shared/ui/PhotoStripe';
import { SyncBadge } from '../../shared/ui/SyncBadge';
import { NumText } from '../../shared/ui/NumText';
import { Coleta } from '../types';
import { palette } from '../../../theme/palette';

interface ColetaRowProps {
  row: Coleta;
  variant?: 'compact' | 'detailed';
  pricePerLiter?: number;
}

export function ColetaRow({ row, variant = 'compact', pricePerLiter = 0 }: ColetaRowProps) {
  if (variant === 'detailed') {
    const value = row.volume * pricePerLiter;
    return (
      <View style={styles.detailedRow}>
        <PhotoStripe variant="md" />
        <View style={styles.info}>
          <Text style={styles.detailedDate}>{row.date}</Text>
          <View style={styles.detailedMeta}>
            <NumText style={styles.detailedTime}>{row.time}</NumText>
            <View style={styles.dot} />
            <SyncBadge state="synced" />
          </View>
        </View>
        <View style={styles.detailedRight}>
          <NumText style={styles.detailedVolume}>
            {row.volume} <Text style={styles.unit}>L</Text>
          </NumText>
          <NumText style={styles.detailedValue}>
            R$ {value.toFixed(2).replace('.', ',')}
          </NumText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.compactRow}>
      <PhotoStripe variant="sm" />
      <View style={styles.info}>
        <Text style={styles.compactDate}>{row.date}</Text>
        <NumText style={styles.compactTime}>{row.time}</NumText>
      </View>
      <NumText style={styles.compactVolume}>
        {row.volume} <Text style={styles.unit}>L</Text>
      </NumText>
    </View>
  );
}

const styles = StyleSheet.create({
  detailedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  detailedDate: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 15,
    color: palette.ink,
    letterSpacing: -0.4,
  },
  detailedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  detailedTime: {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 12,
    color: palette.ink2,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: palette.ink3,
  },
  detailedRight: {
    alignItems: 'flex-end',
  },
  detailedVolume: {
    fontFamily: 'JetBrainsMono_800ExtraBold',
    fontSize: 20,
    color: palette.ink,
  },
  detailedValue: {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 11,
    color: palette.ink3,
    marginTop: 2,
  },
  compactDate: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 14,
    color: palette.ink,
  },
  compactTime: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 12,
    color: palette.ink2,
    marginTop: 2,
  },
  compactVolume: {
    fontFamily: 'JetBrainsMono_800ExtraBold',
    fontSize: 18,
    color: palette.ink,
  },
  unit: {
    fontSize: 12,
    color: palette.ink2,
  },
});
