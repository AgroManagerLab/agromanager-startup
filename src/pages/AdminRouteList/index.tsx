import React, { useCallback, useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { SearchIcon, PlusIcon } from '../../components/icons/Icon';
import { getAllRoutes } from '../../services/adminService';
import { colors } from '../../global/themes';
import { styles } from './styles';

function RouteListItem({
  name,
  identifier,
  producerCount,
  milkmanName,
  onPress,
}: {
  name: string;
  identifier: string | null;
  producerCount: number;
  milkmanName: string | null;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.listItem}>
      <View style={styles.routeInitials}>
        <Text style={styles.routeInitialsText}>
          {name.split(' ').map((s: string) => s[0]).slice(0, 2).join('')}
        </Text>
      </View>
      <View style={styles.listInfo}>
        <Text style={styles.listName} numberOfLines={1}>{name}</Text>
        <Text style={styles.listMeta} numberOfLines={1}>
          {identifier ?? '—'} · {producerCount} {producerCount === 1 ? 'produtor' : 'produtores'}
        </Text>
      </View>
      {milkmanName ? (
        <View style={styles.milkmanBadge}>
          <Text style={styles.milkmanBadgeText} numberOfLines={1}>{milkmanName}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export function AdminRouteListPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((k) => k + 1);
    }, []),
  );

  const routes = useMemo(
    () => getAllRoutes(),
    [refreshKey], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const filtered = useMemo(
    () => {
      if (!search) return routes;
      const q = search.toLowerCase();
      return routes.filter(
        (r) => r.name.toLowerCase().includes(q) || (r.identifier && r.identifier.toLowerCase().includes(q)),
      );
    },
    [routes, search],
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Rotas"
        subtitle={`${routes.length} cadastradas`}
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.headerPlus}
            onPress={() => navigation.navigate('AdminRegisterRoute')}
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
            placeholder="Buscar por nome ou identificador"
            placeholderTextColor={colors.ink3}
          />
        </View>
      </View>

      <ScrollView style={styles.listScroll} contentContainerStyle={styles.listContent}>
        {filtered.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              {search ? 'Nenhuma rota encontrada' : 'Nenhuma rota cadastrada'}
            </Text>
          </Card>
        ) : (
          <Card style={styles.listCard}>
            {filtered.map((r, i) => (
              <React.Fragment key={r.id}>
                {i > 0 && <Divider />}
                <RouteListItem
                  name={r.name}
                  identifier={r.identifier}
                  producerCount={r.producerCount}
                  milkmanName={r.milkmanName}
                  onPress={() => navigation.navigate('AdminRouteDetail', { routeId: r.id })}
                />
              </React.Fragment>
            ))}
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
