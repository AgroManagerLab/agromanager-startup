import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { EditIcon } from '../../components/icons/Icon';
import { getRouteById, getRouteProducers, deleteRoute } from '../../services/adminService';
import { colors } from '../../global/themes';
import { styles } from './styles';

export function AdminRouteDetailPage() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'AdminRouteDetail'>>();
  const { routeId } = route.params;

  const [detail, setDetail] = useState(() => getRouteById(routeId));
  const [producers, setProducers] = useState(() => getRouteProducers(routeId));

  useFocusEffect(
    useCallback(() => {
      setDetail(getRouteById(routeId));
      setProducers(getRouteProducers(routeId));
    }, [routeId]),
  );

  function handleDelete() {
    if (!detail) return;
    Alert.alert(
      'Excluir rota',
      `Tem certeza que deseja excluir ${detail.name}? Os produtores serão desvinculados e o histórico de coletas será preservado.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            try {
              deleteRoute(routeId);
              navigation.goBack();
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir a rota. Tente novamente.');
            }
          },
        },
      ],
    );
  }

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
        right={
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.editBtn}
            onPress={() => navigation.navigate('AdminRegisterRoute', { routeId })}
          >
            <EditIcon size={20} color={colors.ink2} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.metricCard}>
          <View style={styles.metricRow}>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>Produtores</Text>
              <Text style={styles.metricValue}>{detail.producerCount}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>Coletados hoje</Text>
              <Text style={styles.metricValue}>{detail.done}/{detail.total}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>Leiteiro</Text>
              <Text style={[styles.metricValue, styles.metricValueSmall]} numberOfLines={1}>
                {detail.milkmanName ?? '—'}
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Produtores na rota</Text>
          <Text style={styles.sectionCount}>{producers.length}</Text>
        </View>

        {producers.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Nenhum produtor nesta rota</Text>
          </Card>
        ) : (
          <Card style={styles.producerCard}>
            {producers.map((p, i) => (
              <React.Fragment key={p.id}>
                {i > 0 && <Divider />}
                <View style={styles.producerRow}>
                  <View style={styles.producerAvatar}>
                    <Text style={styles.producerAvatarText}>
                      {p.name.split(' ').map((s: string) => s[0]).slice(0, 2).join('')}
                    </Text>
                  </View>
                  <View style={styles.producerInfo}>
                    <Text style={styles.producerName} numberOfLines={1}>{p.name}</Text>
                    <Text style={styles.producerFarm} numberOfLines={1}>{p.farm}</Text>
                  </View>
                  <View style={styles.volumeBadge}>
                    <Text style={styles.volumeText}>{p.monthVolume.toLocaleString('pt-BR')}L</Text>
                  </View>
                </View>
              </React.Fragment>
            ))}
          </Card>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteBtnText}>Excluir rota</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
