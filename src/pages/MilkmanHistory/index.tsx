import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../global/themes';
import {
  Card,
  Divider,
  ScreenHeader,
  OfflineBanner,
  FilterPill,
  SyncBadge,
  ChevronIcon,
} from '../../components';
import { useAuth } from '../../context/AuthContext';
import { getMilkmanHistory } from '../../services/milkmanService';
import type { MilkmanCollectionRow } from '../../types';
import { styles } from './styles';

type Filter = 'all' | 'synced' | 'pending';

export function MilkmanHistoryPage() {
  const { userId } = useAuth();
  const groups = getMilkmanHistory(userId!);
  const [filter, setFilter] = useState<Filter>('all');

  const totalPending = groups.reduce(
    (a, g) => a + g.rows.filter((r) => r.status === 'pending').length,
    0,
  );
  const totalSynced = groups.reduce(
    (a, g) => a + g.rows.filter((r) => r.status === 'synced').length,
    0,
  );

  const filteredGroups = groups
    .map((g) => ({
      date: g.date,
      rows:
        filter === 'all'
          ? g.rows
          : g.rows.filter((r) => r.status === filter),
    }))
    .filter((g) => g.rows.length > 0);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Histórico" subtitle="Suas coletas · todas as rotas" />
      <OfflineBanner pendingCount={totalPending} />

      {/* Filter pills */}
      <View style={styles.filterRow}>
        <FilterPill
          label="Todas"
          active={filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterPill
          label="Pendentes"
          active={filter === 'pending'}
          count={totalPending}
          onPress={() => setFilter('pending')}
        />
        <FilterPill
          label="Sincronizadas"
          active={filter === 'synced'}
          count={totalSynced}
          onPress={() => setFilter('synced')}
        />
      </View>

      {/* List */}
      <View style={styles.listWrap}>
        {filteredGroups.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhuma coleta registrada</Text>
          </View>
        ) : (
          <FlatList
            data={filteredGroups}
            keyExtractor={(item) => item.date}
            contentContainerStyle={styles.listContent}
            renderItem={({ item: group }) => (
              <View>
                <Text style={styles.dateLabel}>{formatGroupLabel(group.date)}</Text>
                <Card style={styles.groupCard}>
                  {group.rows.map((row, i) => (
                    <View key={row.id}>
                      {i > 0 ? <Divider /> : null}
                      <MilkmanCollectionRowComponent row={row} />
                    </View>
                  ))}
                </Card>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

function MilkmanCollectionRowComponent({ row }: { row: MilkmanCollectionRow }) {
  return (
    <TouchableOpacity style={styles.coletaRow} activeOpacity={0.7}>
      <View style={styles.photoPlaceholder} />
      <View style={styles.coletaInfo}>
        <Text style={styles.coletaName}>{row.producer}</Text>
        <View style={styles.coletaMeta}>
          <Text style={styles.coletaTime}>{row.time}</Text>
          <View style={styles.coletaDot} />
          <SyncBadge state={row.status} />
        </View>
      </View>
      <View style={styles.coletaRight}>
        <Text style={styles.coletaVolume}>
          {row.volume} <Text style={styles.coletaVolumeUnit}>L</Text>
        </Text>
      </View>
      <ChevronIcon size={16} color={colors.ink3} />
    </TouchableOpacity>
  );
}

function formatGroupLabel(date: string): string {
  const today = new Date();
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const todayStr = `${today.getDate()} ${months[today.getMonth()]}`;
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getDate()} ${months[yesterday.getMonth()]}`;

  if (date === todayStr) return `Hoje · ${date}`;
  if (date === yesterdayStr) return `Ontem · ${date}`;
  return date;
}
