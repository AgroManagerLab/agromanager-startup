import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../global/themes';
import {
  Card,
  Divider,
  ScreenHeader,
  OfflineBanner,
  SearchIcon,
  SyncBadge,
  Avatar,
} from '../../components';
import { useAuth } from '../../context/AuthContext';
import { getMilkmanRouteProducers } from '../../services/milkmanService';
import type { RootStackParamList, RouteProducer } from '../../types';
import { styles } from './styles';

export function MilkmanListagemPage() {
  const { userId } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const producers = getMilkmanRouteProducers(userId!);
  const [search, setSearch] = useState('');

  const total = producers.length;
  const done = producers.filter((p) => p.status !== 'next').length;
  const filtered = search.trim()
    ? producers.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.farm.toLowerCase().includes(search.toLowerCase()),
      )
    : producers;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Minha rota" subtitle={`${total} produtores · ${done} coletados`} />
      <OfflineBanner pendingCount={producers.filter((p) => p.status === 'pending').length} />

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
              renderItem={({ item }) => (
                <LeiteiroProdRow
                  producer={item}
                  onPress={() => {
                    if (item.status !== 'synced') {
                      navigation.navigate('MilkmanRegistroColeta', {
                        producerId: item.id,
                      });
                    }
                  }}
                />
              )}
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
