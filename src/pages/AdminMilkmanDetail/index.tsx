import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { EditIcon } from '../../components/icons/Icon';
import { getAdminMilkmanDetail, deleteMilkman } from '../../services/adminService';
import { colors } from '../../global/themes';
import { styles } from './styles';

export function AdminMilkmanDetailPage() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'AdminMilkmanDetail'>>();
  const { milkmanId } = route.params;

  const [detail, setDetail] = useState(() => getAdminMilkmanDetail(milkmanId));

  useFocusEffect(
    useCallback(() => {
      setDetail(getAdminMilkmanDetail(milkmanId));
    }, [milkmanId]),
  );

  // FR-1.4 — exclusão com confirmação; preserva histórico de coletas.
  function handleDelete() {
    if (!detail) return;
    Alert.alert(
      'Excluir leiteiro',
      `Tem certeza que deseja excluir ${detail.name}? As coletas registradas serão mantidas no histórico, mas sem vínculo ao leiteiro.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            try {
              deleteMilkman(milkmanId);
              navigation.goBack();
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir o leiteiro. Tente novamente.');
            }
          },
        },
      ],
    );
  }

  if (!detail) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Leiteiro" onBack={() => navigation.goBack()} />
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Leiteiro não encontrado</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={detail.name}
        subtitle={detail.email}
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.editBtn}
            onPress={() => navigation.navigate('AdminRegisterMilkman', { milkmanId })}
          >
            <EditIcon size={20} color={colors.ink2} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.metricCard}>
          <Text style={styles.metricLabel}>Coletado hoje</Text>
          <Text style={styles.metricHint}>
            {detail.todayCollected.toLocaleString('pt-BR')} L em todas as rotas
          </Text>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rotas vinculadas</Text>
          <Text style={styles.sectionCount}>{detail.routes.length}</Text>
        </View>

        {detail.routes.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Nenhuma rota vinculada</Text>
          </Card>
        ) : (
          detail.routes.map((r) => (
            <Card key={r.routeId} style={styles.routeCard}>
              <View style={styles.routeTop}>
                <View>
                  <Text style={styles.routeName}>{r.routeName}</Text>
                  {r.identifier ? (
                    <Text style={styles.routeIdentifier}>{r.identifier}</Text>
                  ) : null}
                </View>
                <View style={styles.progressBadge}>
                  <Text style={styles.progressBadgeText}>{r.done}/{r.total}</Text>
                </View>
              </View>
              <Text style={styles.routeMeta}>
                {r.producerCount === 1 ? '1 produtor' : `${r.producerCount} produtores`}
                {r.active ? ' · rota ativa do leiteiro' : ''}
              </Text>
            </Card>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteBtnText}>Excluir leiteiro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
