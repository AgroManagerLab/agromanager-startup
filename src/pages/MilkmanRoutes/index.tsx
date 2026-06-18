import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { MilkmanRouteStatus } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { getMilkmanRoutesWithStatus, getActiveRouteId, setActiveRoute, startRoute } from '../../services/milkmanService';
import { styles } from './styles';

export function MilkmanRoutesPage() {
  const { userId } = useAuth();
  const [routes, setRoutes] = useState<MilkmanRouteStatus[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const reload = useCallback(() => {
    if (!userId) return;
    setRoutes(getMilkmanRoutesWithStatus(userId));
    setActiveId(getActiveRouteId(userId));
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  // FR-3.2 — escolher a rota ativa que foca Início e Produtores.
  function selectRoute(routeId: string | null) {
    if (!userId) return;
    setActiveRoute(userId, routeId);
    reload();
  }

  // Marca a rota como iniciada hoje (visível para o admin no painel).
  function beginRoute(routeId: string) {
    if (!userId) return;
    startRoute(userId, routeId);
    reload();
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Minhas rotas" subtitle="Toque para focar uma rota no seu dia" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Opção "todas as rotas" */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => selectRoute(null)}>
          <Card style={[styles.card, activeId === null && styles.cardActive]}>
            <View style={styles.cardTop}>
              <Text style={styles.routeName}>Todas as rotas</Text>
              {activeId === null ? (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Ativa</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.allCardLabel}>Mostra produtores e progresso de todas as suas rotas.</Text>
          </Card>
        </TouchableOpacity>

        {routes.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              Nenhuma rota vinculada a você ainda.{'\n'}Fale com a cooperativa.
            </Text>
          </Card>
        ) : (
          routes.map((r) => {
            const isActive = activeId === r.routeId;
            return (
              <Card key={r.routeId} style={[styles.card, isActive && styles.cardActive]}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => selectRoute(r.routeId)}>
                  <View style={styles.cardTop}>
                    <View>
                      <Text style={styles.routeName}>{r.routeName}</Text>
                      {r.identifier ? (
                        <Text style={styles.routeIdentifier}>{r.identifier}</Text>
                      ) : null}
                    </View>
                    {isActive ? (
                      <View style={styles.activeBadge}>
                        <Text style={styles.activeBadgeText}>Ativa</Text>
                      </View>
                    ) : (
                      <View style={styles.progressBadge}>
                        <Text style={styles.progressBadgeText}>{r.done}/{r.total}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.routeMeta}>
                    {r.producerCount === 1 ? '1 produtor' : `${r.producerCount} produtores`} · {r.done}/{r.total} coletados hoje
                  </Text>
                </TouchableOpacity>

                {r.startedToday ? (
                  <View style={styles.startedRow}>
                    <Text style={styles.startedText}>✓ Rota iniciada hoje</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.startBtn}
                    onPress={() => beginRoute(r.routeId)}
                  >
                    <Text style={styles.startBtnText}>Iniciar rota</Text>
                  </TouchableOpacity>
                )}
              </Card>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
