import React, { useCallback, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { UsersIcon, RouteIcon, TruckIcon, ChevronIcon } from '../../components/icons/Icon';
import { loadAdminDashboard } from '../../services/adminService';
import { colors } from '../../global/themes';
import { styles } from './styles';

function CadastroCard({
  icon,
  iconBg,
  countColor,
  title,
  subtitle,
  count,
  onPress,
}: {
  icon: React.ReactNode;
  iconBg: string;
  countColor: string;
  title: string;
  subtitle: string;
  count: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.cadastroCard}>
      <View style={[styles.cadastroIcon, { backgroundColor: iconBg }]}>
        {icon}
      </View>
      <View style={styles.cadastroInfo}>
        <Text style={styles.cadastroTitle}>{title}</Text>
        <Text style={styles.cadastroSubtitle}>{subtitle}</Text>
        <Text style={[styles.cadastroCount, { color: countColor }]}>{count}</Text>
      </View>
      <ChevronIcon size={16} color={colors.ink3} />
    </TouchableOpacity>
  );
}

export function AdminRegistrationsHubPage() {
  const navigation = useNavigation<any>();
  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((k) => k + 1);
    }, []),
  );

  const data = useMemo(
    () => loadAdminDashboard(),
    [refreshKey], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="Cadastros" subtitle="O que você quer cadastrar?" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <CadastroCard
          icon={<UsersIcon size={28} color={colors.primaryDark} />}
          iconBg={colors.primarySoft}
          countColor={colors.primaryDark}
          title="Produtor"
          subtitle="Nome, fazenda, rota, senha inicial"
          count={`${data.totalProducers} cadastrados`}
          onPress={() => navigation.navigate('AdminRegisterProducer')}
        />
        <CadastroCard
          icon={<RouteIcon size={28} color={'#7A521B'} />}
          iconBg={colors.accentSoft}
          countColor={'#7A521B'}
          title="Rota"
          subtitle="Sequência de coleta e produtores"
          count={`${data.totalRoutes} ativas`}
          onPress={() => navigation.navigate('AdminRouteList')}
        />
        <CadastroCard
          icon={<TruckIcon size={28} color={'#1F4D38'} />}
          iconBg={'#DCEFE3'}
          countColor={'#1F4D38'}
          title="Leiteiro"
          subtitle="E-mail, senha e rotas vinculadas"
          count={`${data.totalMilkmen} cadastrados`}
          onPress={() => navigation.navigate('AdminMilkmanList')}
        />
      </ScrollView>
    </View>
  );
}
