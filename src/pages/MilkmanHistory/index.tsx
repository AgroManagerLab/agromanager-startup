import React, { useCallback, useState } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../global/themes';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { ScreenHeader } from '../../components/ScreenHeader';
import { OfflineBanner } from '../../components/OfflineBanner';
import { FilterPill } from '../../components/FilterPill';
import { SyncBadge } from '../../components/SyncBadge';
import { ChevronIcon, SyncIcon } from '../../components/icons/Icon';
import { useAuth } from '../../context/AuthContext';
import { useConnectivity } from '../../context/ConnectivityContext';
import { getMilkmanHistory, syncPendingCollections } from '../../services/milkmanService';
import type { MilkmanCollectionRow, RootStackParamList } from '../../types';
import { styles } from './styles';

type Filter = 'all' | 'synced' | 'pending';

export function MilkmanHistoryPage() {
  const { userId } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isConnected } = useConnectivity();
  const [groups, setGroups] = useState(() => getMilkmanHistory(userId!));
  const [filter, setFilter] = useState<Filter>('all');

  useFocusEffect(
    useCallback(() => {
      setGroups(getMilkmanHistory(userId!));
    }, [userId]),
  );

  const handleSync = useCallback(() => {
    syncPendingCollections(userId!);
    setGroups(getMilkmanHistory(userId!));
  }, [userId]);

  const renderGroup = useCallback(
    ({ item: group }: { item: { date: string; rows: MilkmanCollectionRow[] } }) => (
      <View>
        <Text style={styles.dateLabel}>{formatGroupLabel(group.date)}</Text>
        <Card style={styles.groupCard}>
          {group.rows.map((row, i) => (
            <View key={row.id}>
              {i > 0 ? <Divider /> : null}
              <MilkmanCollectionRowComponent
                row={row}
                onPress={() => navigation.navigate('MilkmanCollectionDetail', { collectionId: row.id })}
              />
            </View>
          ))}
        </Card>
      </View>
    ),
    [navigation],
  );

  const totalPending = groups.reduce(
    (a, g) => a + g.rows.filter((r) => r.status === 'pending').length,
    0,
  );
  const totalSynced = groups.reduce(
    (a, g) => a + g.rows.filter((r) => r.status === 'synced').length,
    0,
  );

  const filteredGroups = groups.reduce<{ date: string; rows: MilkmanCollectionRow[] }[]>(
    (acc, g) => {
      const rows = filter === 'all' ? g.rows : g.rows.filter((r) => r.status === filter);
      if (rows.length > 0) acc.push({ date: g.date, rows });
      return acc;
    },
    [],
  );

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

      {filter === 'pending' && totalPending > 0 && isConnected && (
        <View style={styles.syncBar}>
          <Text style={styles.syncBarText}>{totalPending} pendente{totalPending > 1 ? 's' : ''}</Text>
          <TouchableOpacity style={styles.syncBtn} onPress={handleSync} activeOpacity={0.7}>
            <SyncIcon size={16} color={colors.contrast} />
            <Text style={styles.syncBtnText}>Sincronizar</Text>
          </TouchableOpacity>
        </View>
      )}

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
            renderItem={renderGroup}
          />
        )}
      </View>
    </View>
  );
}

function MilkmanCollectionRowComponent({ row, onPress }: { row: MilkmanCollectionRow; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.coletaRow} activeOpacity={0.7} onPress={onPress}>
      {row.photoUri ? (
        <Image source={{ uri: row.photoUri }} style={styles.coletaPhoto} />
      ) : (
        <View style={styles.photoPlaceholder} />
      )}
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
