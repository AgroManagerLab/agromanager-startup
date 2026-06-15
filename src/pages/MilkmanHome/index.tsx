import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../global/themes';
import {
  Card,
  Divider,
  Wordmark,
  PlusIcon,
} from '../../components';
import { useAuth } from '../../context/AuthContext';
import { loadMilkmanHomeData } from '../../services/milkmanService';
import type { RootStackParamList } from '../../types';
import { formatDate } from '../../utils/date';
import { styles } from './styles';

export function MilkmanHomePage() {
  const insets = useSafeAreaInsets();
  const { userId } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const data = loadMilkmanHomeData(userId!);

  if (!data) {
    return <View style={styles.container} />;
  }

  const progress = data.totalProducers > 0 ? data.doneCount / data.totalProducers : 0;
  const firstName = data.profile.name.split(' ')[0];
  const todayLabel = formatDate(new Date());

  const firstPending = data.nextStops.length > 0 ? data.nextStops[0] : null;

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        {/* Hero band */}
        <View style={[styles.hero, { paddingTop: insets.top + 16 }]}>
          <View style={styles.heroTop}>
            <Wordmark tone="light" />
            <View style={styles.dateBadge}>
              <View style={styles.dateDot} />
              <Text style={styles.dateText}>{todayLabel}</Text>
            </View>
          </View>
          <Text style={styles.greeting}>Olá, {firstName}</Text>
          <Text style={styles.routeName}>{data.profile.routeName}</Text>

          {/* Progress card */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progresso de hoje</Text>
              <Text style={styles.progressCount}>
                {data.doneCount} / {data.totalProducers}
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(progress * 100, 100)}%` as any },
                ]}
              />
            </View>
            <View style={styles.progressMetrics}>
              <MiniMetric label="Coletado" value={`${data.todayCollected} L`} />
              <MiniMetric label="Pendentes" value={`${data.pendingCount}`} warn />
              <MiniMetric
                label="Sincr."
                value={`${data.syncedCount} / ${data.doneCount}`}
              />
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.registerBtn}
            activeOpacity={0.7}
            onPress={() => {
              if (firstPending) {
                navigation.navigate('MilkmanRegistroColeta', {
                  producerId: firstPending.id,
                });
              }
            }}
          >
            <PlusIcon size={20} color={colors.accentInk} />
            <Text style={styles.registerBtnText}>Registrar coleta</Text>
          </TouchableOpacity>

          {data.nextStops.length > 0 && (
            <>
              <Text style={styles.nextStopsLabel}>Próximas paradas</Text>
              <Card style={styles.nextStopsCard}>
                {data.nextStops.map((stop, i) => (
                  <View key={stop.id}>
                    {i > 0 ? <Divider /> : null}
                    <NextStopRow stop={stop} />
                  </View>
                ))}
              </Card>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function MiniMetric({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <View>
      <Text style={styles.miniLabel}>{label}</Text>
      <Text style={[styles.miniValue, warn && styles.miniValueWarn]}>
        {value}
      </Text>
    </View>
  );
}

function NextStopRow({ stop }: { stop: import('../../types').RouteProducer }) {
  return (
    <View style={styles.nextStopRow}>
      <View style={styles.nextStopBadge}>
        <Text style={styles.nextStopBadgeText}>{stop.seq}</Text>
      </View>
      <View style={styles.nextStopInfo}>
        <Text style={styles.nextStopName}>{stop.name}</Text>
        <Text style={styles.nextStopFarm}>{stop.farm}</Text>
      </View>
    </View>
  );
}
