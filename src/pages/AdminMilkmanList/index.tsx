import React, { useCallback, useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AdminMilkmanSummary, RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { SearchIcon, PlusIcon } from '../../components/icons/Icon';
import { getAdminMilkmen } from '../../services/adminService';
import { colors } from '../../global/themes';
import { styles } from './styles';

function MilkmanListItem({
  item,
  onPress,
}: {
  item: AdminMilkmanSummary;
  onPress: () => void;
}) {
  const initials = item.name.split(' ').map((s: string) => s[0]).slice(0, 2).join('');
  const routeLabel = item.routeCount === 1 ? '1 rota' : `${item.routeCount} rotas`;
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.listItem}>
      <View style={[styles.listAvatar, { backgroundColor: `hsl(${item.hue}, 40%, 85%)` }]}>
        <Text style={[styles.listAvatarText, { color: `hsl(${item.hue}, 50%, 30%)` }]}>
          {initials}
        </Text>
      </View>
      <View style={styles.listInfo}>
        <Text style={styles.listName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.listMeta} numberOfLines={1}>{item.email}</Text>
      </View>
      <View style={styles.routeBadge}>
        <Text style={styles.routeBadgeText}>{routeLabel}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function AdminMilkmanListPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((k) => k + 1);
    }, []),
  );

  const milkmen = useMemo(
    () => getAdminMilkmen(search || undefined),
    [search, refreshKey], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Leiteiros"
        subtitle={`${milkmen.length} cadastrados`}
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.headerPlus}
            onPress={() => navigation.navigate('AdminRegisterMilkman')}
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
            placeholder="Buscar por nome ou e-mail"
            placeholderTextColor={colors.ink3}
          />
        </View>
      </View>

      <ScrollView style={styles.listScroll} contentContainerStyle={styles.listContent}>
        {milkmen.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              {search ? 'Nenhum leiteiro encontrado' : 'Nenhum leiteiro cadastrado'}
            </Text>
          </Card>
        ) : (
          <Card style={styles.listCard}>
            {milkmen.map((m, i) => (
              <React.Fragment key={m.id}>
                {i > 0 && <Divider />}
                <MilkmanListItem
                  item={m}
                  onPress={() => navigation.navigate('AdminMilkmanDetail', { milkmanId: m.id })}
                />
              </React.Fragment>
            ))}
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
