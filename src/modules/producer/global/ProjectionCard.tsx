import React from 'react';
import { View, Text } from 'react-native';
import { MoneyBRL, NumText, WalletIcon, InfoIcon } from '../../../global/ui';
import { colors } from '../../../global/theme';
import { styles } from './styles';

interface ProjectionCardProps {
  projection: number;
  monthVolume: number;
  pricePerLiter: number;
}

// Projeção de pagamento do mês — REQ-04.4 (valor, volume e preço) e
// REQ-04.7 (deixa explícito que é estimativa).
export function ProjectionCard({ projection, monthVolume, pricePerLiter }: ProjectionCardProps) {
  return (
    <View style={styles.projectionCard}>
      <View style={styles.projectionRow}>
        <View style={styles.projectionIconWrap}>
          <WalletIcon size={24} color={colors.accentInk} />
        </View>
        <View style={styles.projectionContent}>
          <Text style={styles.projectionLabel}>Projeção · maio</Text>
          <View style={styles.projectionMoneyWrap}>
            <MoneyBRL value={projection} />
          </View>
          <NumText style={styles.projectionFormula}>
            {monthVolume.toLocaleString('pt-BR')} L × R$ {pricePerLiter.toFixed(2).replace('.', ',')}/L
          </NumText>
        </View>
      </View>
      <View style={styles.projectionNote}>
        <View style={styles.projectionNoteIcon}>
          <InfoIcon size={14} color={colors.accentInk} />
        </View>
        <Text style={styles.projectionNoteText}>Valor estimado. Não é o pagamento final do mês.</Text>
      </View>
    </View>
  );
}
