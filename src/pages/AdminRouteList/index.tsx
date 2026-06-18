import React, { useCallback, useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AdminRouteSummary, RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { SearchIcon, PlusIcon, RouteIcon } from '../../components/icons/Icon';
import { getAdminRoutes } from '../../services/adminService';
import { colors } from '../../global/themes';
import { styles } from './styles';

function RouteListItem({
  item,
  onPress,
}: {
  item: AdminRouteSummary;
  onPress: () => void;
}) {
  const producerLabel = item.producerCount === 1 ? '1 produtor' : `${item.producerCount} produtores`;
  const milkmanLabel = item.milkmanNames.length > 0
    ? item.milkmanNames.join(', ')
    : 'Sem leiteiro';
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.listItem}>
      <View style={styles.routeIcon}>
        <RouteIcon size={22} color={'#7A521B'} />
      </View>
      <View style={styles.listInfo}>
        <Text style={styles.listName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.listMeta} numberOfLines={1}>{producerLabel}</Text>
        <Text style={styles.listSub} numberOfLines={1}>Leiteiros: {milkmanLabel}</Text>
      </View>
      {item.identifier ? (
        <View style={styles.identifierBadge}>
          <Text style={styles.identifierText}>{item.identifier}</Text>
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
    () => getAdminRoutes(search || undefined),
    [search, refreshKey], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Rotas"
        subtitle={`${routes.length} ${routes.length === 1 ? 'rota' : 'rotas'}`}
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
        {routes.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              {search ? 'Nenhuma rota encontrada' : 'Nenhuma rota cadastrada'}
            </Text>
          </Card>
        ) : (
          <Card style={styles.listCard}>
            {routes.map((r, i) => (
              <React.Fragment key={r.id}>
                {i > 0 && <Divider />}
                <RouteListItem
                  item={r}
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
