import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../global/themes';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { ScreenHeader } from '../../components/ScreenHeader';
import { OfflineBanner } from '../../components/OfflineBanner';
import { SearchIcon, SyncIcon } from '../../components/icons/Icon';
import { SyncBadge } from '../../components/SyncBadge';
import { Avatar } from '../../components/Avatar';
import { useAuth } from '../../context/AuthContext';
import { useConnectivity } from '../../context/ConnectivityContext';
import {
  getMilkmanRouteProducers,
  syncPendingCollections,
} from '../../services/milkmanService';
import type { RootStackParamList, RouteProducer } from '../../types';
import { styles } from './styles';

export function MilkmanListPage() {
  const { userId } = useAuth();
  const { isConnected } = useConnectivity();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const wasOffline = useRef(false);

  const producers = useMemo(() => getMilkmanRouteProducers(userId!), [userId, refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-sync when coming back online
  useEffect(() => {
    if (wasOffline.current && isConnected) {
      const synced = syncPendingCollections(userId!);
      if (synced > 0) setRefreshKey((k) => k + 1);
    }
    wasOffline.current = !isConnected;
  }, [isConnected, userId]);

  // Refresh data every time the screen gains focus
  useFocusEffect(
    useCallback(() => {
      setRefreshKey((k) => k + 1);
    }, []),
  );

  const handleSync = () => {
    const synced = syncPendingCollections(userId!);
    if (synced > 0) setRefreshKey((k) => k + 1);
  };

  const pendingCount = producers.filter((p) => p.status === 'pending').length;
  const total = producers.length;
  const done = producers.filter((p) => p.status !== 'next').length;

  const renderProdRow = useCallback(
    ({ item }: { item: RouteProducer }) => (
      <LeiteiroProdRow
        producer={item}
        onPress={() => {
          if (item.status !== 'synced') {
            navigation.navigate('MilkmanRegisterCollection', {
              producerId: item.id,
            });
          }
        }}
      />
    ),
    [navigation],
  );

  const filtered = search.trim()
    ? producers.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.farm.toLowerCase().includes(search.toLowerCase()),
      )
    : producers;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Minha rota"
        subtitle={`${total} produtores · ${done} coletados`}
        right={
          pendingCount > 0 && isConnected ? (
            <TouchableOpacity style={styles.syncBtn} onPress={handleSync} activeOpacity={0.7}>
              <SyncIcon size={16} color={colors.primary} />
              <Text style={styles.syncBtnText}>Sincronizar</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />
      <OfflineBanner pendingCount={pendingCount} />

      {/* Search */}
      <View style={[styles.searchWrap, { paddingHorizontal: 20 }]}>
        <View style={styles.searchInput}>
          <SearchIcon size={18} color={colors.ink3} />
          <TextInput
            style={styles.searchField}
            placeholder="Buscar produtor"
            placeholderTextColor={colors.ink3}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* List */}
      <View style={styles.listWrap}>
        <Card style={styles.listCard}>
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nenhum produtor encontrado</Text>
            </View>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={Divider}
              renderItem={renderProdRow}
            />
          )}
        </Card>
      </View>
    </View>
  );
}

function LeiteiroProdRow({
  producer,
  onPress,
}: {
  producer: RouteProducer;
  onPress: () => void;
}) {
  const state = producer.status;
  const volColor =
    state === 'synced'
      ? colors.ink
      : state === 'pending'
        ? '#B87333'
        : colors.ink3;

  const statusEl =
    state === 'next' ? (
      <Text style={styles.nextLabel}>PRÓXIMO</Text>
    ) : (
      <SyncBadge state={state as 'synced' | 'pending'} />
    );

  return (
    <TouchableOpacity
      style={styles.prodRow}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={state === 'synced'}
    >
      <View style={styles.seqBadge}>
        <Text style={styles.seqText}>{producer.seq}</Text>
      </View>
      <Avatar name={producer.name} size={42} hue={producer.hue} />
      <View style={styles.prodInfo}>
        <Text style={styles.prodName}>{producer.name}</Text>
        <View style={styles.prodStatus}>{statusEl}</View>
      </View>
      {producer.volume !== undefined && (
        <Text style={[styles.prodVolume, { color: volColor }]}>
          {producer.volume} <Text style={styles.prodVolumeUnit}>L</Text>
        </Text>
      )}
    </TouchableOpacity>
  );
}
