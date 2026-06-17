import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { Volume } from '../../components/Volume';
import { MilkrouteBrand } from '../../components/MilkrouteLogo';
import { ProjectionCard } from '../../components/ProjectionCard';
import { CollectionRow } from '../../components/CollectionRow';
import { CURRENT_PRODUCER_ID, loadProducerData, buildProducerHomeSummary } from '../../services/producerService';
import { formatDate } from '../../utils/date';
import { styles } from './styles';

export function ProducerHomePage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const data = loadProducerData(CURRENT_PRODUCER_ID);

  if (!data) {
    return <View style={styles.homeContainer} />;
  }

  const home = buildProducerHomeSummary(data);
  const todayLabel = formatDate(new Date());

  return (
    <View style={styles.homeContainer}>
      <View style={[styles.homeHeader, { paddingTop: insets.top + 8 }]}>
        <View style={styles.homeHeaderTop}>
          <MilkrouteBrand />
          <View style={styles.dateBadge}>
            <View style={styles.dateDot} />
            <Text style={styles.dateText}>{todayLabel}</Text>
          </View>
        </View>
        <Text style={styles.homeGreeting}>Boa tarde, {home.firstName}</Text>
        <Text style={styles.homeFarm}>{data.profile.farm}</Text>
        <View style={styles.homeVolumeSection}>
          <Text style={styles.homeVolumeLabel}>Volume do mês · maio</Text>
          <Volume value={data.monthVolume} variant="hero" />
        </View>
        <ProjectionCard
          projection={data.projection}
          monthVolume={data.monthVolume}
          pricePerLiter={data.pricePerLiter}
        />
      </View>

      <ScrollView style={styles.homeScroll} contentContainerStyle={styles.homeScrollContent}>
        <View style={styles.homeListHeader}>
          <Text style={styles.homeListTitle}>Últimas coletas</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Historico')}>
            <Text style={styles.homeViewAll}>Ver tudo</Text>
          </TouchableOpacity>
        </View>
        <Card style={styles.homeListCard}>
          {home.recentCollections.map((h, i) => (
            <View key={h.id}>
              {i > 0 ? <Divider /> : null}
              <CollectionRow
                row={h}
                variant="compact"
                onPress={() => navigation.navigate('ProducerCollectionDetail', { collectionId: h.id })}
              />
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}
