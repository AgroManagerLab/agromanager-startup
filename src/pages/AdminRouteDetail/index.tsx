import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { getAdminRouteDetail } from '../../services/adminService';
import { styles } from './styles';

function initials(name: string): string {
  return name.split(' ').map((s) => s[0]).slice(0, 2).join('');
}

export function AdminRouteDetailPage() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'AdminRouteDetail'>>();
  const { routeId } = route.params;

  const [detail, setDetail] = useState(() => getAdminRouteDetail(routeId));

  useFocusEffect(
    useCallback(() => {
      setDetail(getAdminRouteDetail(routeId));
    }, [routeId]),
  );

  if (!detail) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Rota" onBack={() => navigation.goBack()} />
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Rota não encontrada</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={detail.name}
        subtitle={detail.identifier ?? 'Sem identificador'}
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Leiteiros responsáveis</Text>
          <Text style={styles.sectionCount}>{detail.milkmen.length}</Text>
        </View>

        {detail.milkmen.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Nenhum leiteiro atribuído a esta rota</Text>
          </Card>
        ) : (
          <Card style={styles.card}>
            {detail.milkmen.map((m, i) => (
              <React.Fragment key={m.id}>
                {i > 0 && <Divider />}
                <View style={styles.row}>
                  <View style={[styles.avatar, { backgroundColor: `hsl(${m.hue}, 40%, 85%)` }]}>
                    <Text style={[styles.avatarText, { color: `hsl(${m.hue}, 50%, 30%)` }]}>
                      {initials(m.name)}
                    </Text>
                  </View>
                  <View style={styles.rowInfo}>
                    <Text style={styles.rowName} numberOfLines={1}>{m.name}</Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
          </Card>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Produtores</Text>
          <Text style={styles.sectionCount}>{detail.producers.length}</Text>
        </View>

        {detail.producers.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Nenhum produtor nesta rota</Text>
          </Card>
        ) : (
          <Card style={styles.card}>
            {detail.producers.map((p, i) => (
              <React.Fragment key={p.id}>
                {i > 0 && <Divider />}
                <View style={styles.row}>
                  <View style={[styles.avatar, { backgroundColor: `hsl(${p.hue}, 40%, 85%)` }]}>
                    <Text style={[styles.avatarText, { color: `hsl(${p.hue}, 50%, 30%)` }]}>
                      {initials(p.name)}
                    </Text>
                  </View>
                  <View style={styles.rowInfo}>
                    <Text style={styles.rowName} numberOfLines={1}>{p.name}</Text>
                    <Text style={styles.rowMeta} numberOfLines={1}>{p.farm}</Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
