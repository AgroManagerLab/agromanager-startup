import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { Volume } from '../../components/Volume';
import { PhotoStripe } from '../../components/PhotoStripe';
import { EditIcon, ArrowLeftIcon } from '../../components/icons/Icon';
import { MoneyBRL } from '../../components/MoneyBRL';
import { getAdminProducerDetail } from '../../services/adminService';
import { colors } from '../../global/themes';
import { currentMonthName } from '../../utils/date';
import { styles } from './styles';

function AdminCollectionRow({
  date,
  time,
  volume,
  milkmanName,
}: {
  date: string;
  time: string;
  volume: number;
  milkmanName: string;
}) {
  return (
    <View style={styles.coletaRow}>
      <PhotoStripe variant="sm" />
      <View style={styles.coletaInfo}>
        <Text style={styles.coletaDate}>
          {date}
          <Text style={styles.coletaTime}>  {time}</Text>
        </Text>
        <Text style={styles.coletaLeiteiro}>{milkmanName}</Text>
      </View>
      <Text style={styles.coletaVolume}>
        {volume} <Text style={styles.coletaVolumeUnit}>L</Text>
      </Text>
    </View>
  );
}

export function AdminProducerDetailPage() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'AdminProducerDetail'>>();
  const { producerId } = route.params;

  const [detail, setDetail] = useState(() => getAdminProducerDetail(producerId));

  useFocusEffect(
    useCallback(() => {
      setDetail(getAdminProducerDetail(producerId));
    }, [producerId]),
  );

  if (!detail) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const { profile, monthVolume, projection, pricePerLiter, history } = detail;
  const syncCount = history.filter((h) => h.status === 'synced').length;
  const month = currentMonthName();
  const priceLabel = `× R$ ${pricePerLiter.toFixed(2).replace('.', ',')}/L`;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={profile.name}
        subtitle={`${profile.farm} · ${profile.route}`}
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.editBtn}
            onPress={() => navigation.navigate('AdminRegisterProducer', { producerId })}
          >
            <EditIcon size={20} color={colors.ink2} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.metricsRow}>
          <Card style={styles.metricCard}>
            <Text style={styles.metricLabel}>Volume · {month}</Text>
            <Volume value={monthVolume} />
            <Text style={styles.metricHint}>{syncCount} coletas sincronizadas</Text>
          </Card>

          <Card style={styles.projectionCard}>
            <Text style={styles.projectionLabel}>Projeção *</Text>
            <MoneyBRL value={projection} variant="dark" />
            <Text style={styles.projectionPrice}>{priceLabel}</Text>
          </Card>
        </View>

        <Text style={styles.disclaimer}>* Valor estimado, não é o pagamento final.</Text>

        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Histórico de coletas</Text>
          <Text style={styles.historyPeriod}>{month} · {history.length} mais recentes</Text>
        </View>

        <Card style={styles.historyCard}>
          {history.length === 0 ? (
            <View style={styles.emptyHistory}>
              <Text style={styles.emptyHistoryText}>Nenhuma coleta neste mês</Text>
            </View>
          ) : (
            history.map((h, i) => (
              <React.Fragment key={`${h.date}-${h.time}`}>
                {i > 0 && <Divider />}
                <AdminCollectionRow
                  date={h.date}
                  time={h.time}
                  volume={h.volume}
                  milkmanName={h.milkmanName}
                />
              </React.Fragment>
            ))
          )}
        </Card>
      </ScrollView>

      <View style={styles.allBtnWrap}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.allBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.ink} />
          <Text style={styles.allBtnText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
