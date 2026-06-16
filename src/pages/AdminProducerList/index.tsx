import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { AdminProducerSummary } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { FilterPill } from '../../components/FilterPill';
import { SearchIcon, PlusIcon } from '../../components/icons/Icon';
import { getAdminProducers, getRoutes, loadAdminDashboard } from '../../services/adminService';
import { colors } from '../../global/themes';
import { styles } from './styles';

function ProdutorListItem({
  item,
  onPress,
}: {
  item: AdminProducerSummary;
  onPress: () => void;
}) {
  const initials = item.name.split(' ').map((s: string) => s[0]).slice(0, 2).join('');
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.listItem}>
      <View style={[styles.listAvatar, { backgroundColor: `hsl(${item.hue}, 40%, 85%)` }]}>
        <Text style={[styles.listAvatarText, { color: `hsl(${item.hue}, 50%, 30%)` }]}>
          {initials}
        </Text>
      </View>
      <View style={styles.listInfo}>
        <Text style={styles.listName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.listMeta} numberOfLines={1}>
          {item.farm} · {item.route}
        </Text>
      </View>
      <View style={styles.listRight}>
        <Text style={styles.listVolume}>
          {item.monthVolume.toLocaleString('pt-BR')} L
        </Text>
        <Text style={styles.listMonthLabel}>mai</Text>
      </View>
    </TouchableOpacity>
  );
}

export function AdminProducerListPage() {
  const navigation = useNavigation<any>();
  const routes = getRoutes();
  const dashboard = loadAdminDashboard();

  const [search, setSearch] = useState('');
  const [activeRouteId, setActiveRouteId] = useState<string | undefined>(undefined);

  const producers = useMemo(
    () => getAdminProducers(search || undefined, activeRouteId),
    [search, activeRouteId],
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Produtores"
        subtitle={`${dashboard.totalProducers} ativos · ${activeRouteId ? routes.find((r) => r.id === activeRouteId)?.name ?? '' : 'todas as rotas'}`}
        right={
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.headerPlus}
            onPress={() => navigation.navigate('AdminRegisterProducer')}
          >
            <PlusIcon size={22} color="#fff" />
          </TouchableOpacity>
        }
      />

      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <SearchIcon size={20} color={colors.ink3} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar por nome ou fazenda"
            placeholderTextColor={colors.ink3}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillRow}>
          <FilterPill
            label="Todas rotas"
            active={!activeRouteId}
            onPress={() => setActiveRouteId(undefined)}
          />
          {routes.map((r) => (
            <FilterPill
              key={r.id}
              label={r.name}
              active={activeRouteId === r.id}
              onPress={() => setActiveRouteId(r.id)}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.listScroll} contentContainerStyle={styles.listContent}>
        {producers.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              {search ? 'Nenhum produtor encontrado' : 'Nenhum produtor cadastrado'}
            </Text>
          </Card>
        ) : (
          <Card style={styles.listCard}>
            {producers.map((p, i) => (
              <React.Fragment key={p.id}>
                {i > 0 && <Divider />}
                <ProdutorListItem
                  item={p}
                  onPress={() => navigation.navigate('AdminProducerDetail', { producerId: p.id })}
                />
              </React.Fragment>
            ))}
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
