import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WalletIcon, InfoIcon } from '../../shared/ui/icons/Icon';
import { MoneyBRL } from '../../shared/ui/MoneyBRL';
import { NumText } from '../../shared/ui/NumText';
import { palette } from '../../../theme/palette';

interface ProjectionCardProps {
  projection: number;
  monthVolume: number;
  pricePerLiter: number;
}

export function ProjectionCard({ projection, monthVolume, pricePerLiter }: ProjectionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <WalletIcon size={24} color={palette.accentInk} />
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Projeção · maio</Text>
          <View style={styles.moneyWrap}>
            <MoneyBRL value={projection} />
          </View>
          <NumText style={styles.formula}>
            {monthVolume.toLocaleString('pt-BR')} L × R$ {pricePerLiter.toFixed(2).replace('.', ',')}/L
          </NumText>
        </View>
      </View>
      <View style={styles.note}>
        <View style={styles.noteIcon}>
          <InfoIcon size={14} color={palette.accentInk} />
        </View>
        <Text style={styles.noteText}>Valor estimado. Não é o pagamento final do mês.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: palette.accent,
    borderRadius: palette.radii.lg,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  label: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: 'rgba(58,42,10,0.70)',
  },
  moneyWrap: {
    marginTop: 2,
  },
  formula: {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 11,
    marginTop: 6,
    color: 'rgba(58,42,10,0.70)',
  },
  note: {
    flexDirection: 'row',
    marginTop: 12,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: palette.radii.xs,
    gap: 6,
    alignItems: 'flex-start',
  },
  noteIcon: {
    marginTop: 1,
  },
  noteText: {
    flex: 1,
    fontFamily: 'Manrope_700Bold',
    fontSize: 12,
    color: palette.accentInk,
  },
});
