import React from 'react';
import { View, Text } from 'react-native';
import { NumText } from './NumText';
import { styles } from './styles';

interface MoneyBRLProps {
  value: number;
  variant?: 'default' | 'dark';
}

function formatBRLParts(value: number) {
  const [int, frac] = value.toFixed(2).split('.');
  const intFmt = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return { intFmt, frac };
}

export function MoneyBRL({ value, variant = 'default' }: MoneyBRLProps) {
  const { intFmt, frac } = formatBRLParts(value);
  if (variant === 'dark') {
    return (
      <Text style={styles.moneyDarkRow}>
        R$ <Text style={styles.moneyDarkInt}>{intFmt}</Text>
        <Text style={styles.moneyDarkFrac}>,{frac}</Text>
      </Text>
    );
  }
  return (
    <View style={styles.moneyRow}>
      <Text style={styles.moneyCurrency}>R$</Text>
      <NumText style={styles.moneyInteger}>{intFmt}</NumText>
      <NumText style={styles.moneyDecimal}>,{frac}</NumText>
    </View>
  );
}
