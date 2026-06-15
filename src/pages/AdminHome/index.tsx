import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Wordmark, Card, Volume, Divider, SettingsIcon, PlusIcon, UsersIcon,
} from '../../components';
import { loadAdminDashboard } from '../../services/adminService';
import { colors, FONT } from '../../global/themes';
import { styles } from './styles';

function ShortcutCard({
  icon,
  bg,
  textColor,
  label,
  hint,
  onPress,
}: {
  icon: React.ReactNode;
  bg: string;
  textColor: string;
  label: string;
  hint: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.shortcutCard, { backgroundColor: bg }]}
    >
      <View style={[styles.shortcutIcon, { backgroundColor: 'rgba(255,255,255,0.6)' }]}>
        {icon}
      </View>
      <Text style={[styles.shortcutLabel, { color: textColor }]}>{label}</Text>
      <Text style={[styles.shortcutHint, { color: textColor, opacity: 0.75 }]}>{hint}</Text>
    </TouchableOpacity>
  );
}

function RouteStatusBadge({ status }: { status: string }) {
  const palette: Record<string, { bg: string; fg: string; label: string }> = {
    rota: { bg: colors.primarySoft, fg: '#1F4D38', label: 'Em rota' },
    concluida: { bg: colors.syncBg, fg: '#1F4D38', label: 'Concluída' },
    esperando: { bg: colors.surface2, fg: colors.ink2, label: 'Aguardando' },
  };
  const s = palette[status] ?? palette.esperando;
  return (
    <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
      <Text style={[styles.statusBadgeText, { color: s.fg }]}>{s.label}</Text>
    </View>
  );
}

function RouteRow({
  name,
  route,
  done,
  total,
  status,
}: {
  name: string;
  route: string;
  done: number;
  total: number;
  status: string;
}) {
  return (
    <View style={styles.routeRow}>
      <View style={styles.routeAvatar}>
        <Text style={styles.routeAvatarText}>
          {name.split(' ').map((s: string) => s[0]).slice(0, 2).join('')}
        </Text>
      </View>
      <View style={styles.routeInfo}>
        <Text style={styles.routeName} numberOfLines={1}>{name}</Text>
        <Text style={styles.routeMeta}>
          {route} · <Text style={{ fontFamily: FONT.monoBold }}>{done}/{total}</Text>
        </Text>
      </View>
      <RouteStatusBadge status={status} />
    </View>
  );
}

export function AdminHomePage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const data = loadAdminDashboard();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.hero, { paddingTop: insets.top + 16 }]}>
          <View style={styles.heroTop}>
            <Wordmark tone="light" />
            <View style={styles.heroSettings}>
              <SettingsIcon size={22} color="#fff" />
            </View>
          </View>
          <Text style={styles.heroCoop}>{data.coopName}</Text>
          <Text style={styles.heroGreeting}>Olá, {data.adminName}</Text>
          <View style={styles.heroBadgeRow}>
            <View style={styles.heroBadge} />
            <Text style={styles.heroBadgeText}>Maio · 14 dias</Text>
          </View>

          <View style={styles.heroMetric}>
            <Text style={styles.heroMetricLabel}>Volume do mês</Text>
            <Volume value={data.monthVolume} variant="hero" />
            <View style={styles.heroMiniStats}>
              <View>
                <Text style={styles.heroMiniLabel}>HOJE</Text>
                <Text style={styles.heroMiniValue}>{data.todayVolume.toLocaleString('pt-BR')} L</Text>
              </View>
              <View style={styles.heroMiniDivider} />
              <View>
                <Text style={styles.heroMiniLabel}>PROJEÇÃO</Text>
                <Text style={styles.heroMiniValue}>
                  R$ {data.projection.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </Text>
              </View>
              <View style={styles.heroMiniDivider} />
              <View>
                <Text style={styles.heroMiniLabel}>PREÇO/L</Text>
                <Text style={styles.heroMiniValue}>
                  R$ {data.pricePerLiter.toFixed(2).replace('.', ',')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Atalhos</Text>
          </View>
          <View style={styles.shortcutGrid}>
            <ShortcutCard
              icon={<PlusIcon size={22} color={colors.primaryDark} />}
              bg={colors.primarySoft}
              textColor={colors.primaryDark}
              label="Cadastros"
              hint="Produtor · Rota · Leiteiro"
              onPress={() => navigation.navigate('AdminCadastrosHub')}
            />
            <ShortcutCard
              icon={<UsersIcon size={22} color={colors.accentInk} />}
              bg={colors.accentSoft}
              textColor={colors.accentInk}
              label="Produtores"
              hint={`${data.totalProducers} ativos`}
              onPress={() => navigation.navigate('AdminListagemProdutores')}
            />
          </View>

          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Equipe em rota agora</Text>
          </View>
          <Card style={styles.routeCard}>
            {data.routeStatuses.length === 0 ? (
              <View style={styles.emptyRoute}>
                <Text style={styles.emptyRouteText}>Nenhuma rota hoje</Text>
              </View>
            ) : (
              data.routeStatuses.map((r, i) => (
                <React.Fragment key={r.routeName}>
                  {i > 0 && <Divider />}
                  <RouteRow
                    name={r.milkmanName}
                    route={r.routeName}
                    done={r.done}
                    total={r.total}
                    status={r.status}
                  />
                </React.Fragment>
              ))
            )}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
