import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Field } from '../../components/Field';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { CheckIcon } from '../../components/icons/Icon';
import {
  createRoute,
  updateRoute,
  getAllProducers,
  getRouteById,
  getRouteProducers,
  isRouteIdentifierTaken,
} from '../../services/adminService';
import { requiredText } from '../../utils/validation';
import { colors } from '../../global/themes';
import { styles, footerStyles } from './styles';

interface ProducerOption {
  id: string;
  name: string;
  farm: string;
  checked: boolean;
  order: number;
}

export function AdminRegisterRoutePage() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'AdminRegisterRoute'>>();
  const routeId = route.params?.routeId;
  const isEditing = !!routeId;

  const allProducers = getAllProducers();
  const existing = isEditing ? getRouteById(routeId) : null;
  const existingProducerIds = isEditing
    ? getRouteProducers(routeId).map((p) => p.id)
    : [];

  const [name, setName] = useState(existing?.name ?? '');
  const [identifier, setIdentifier] = useState(existing?.identifier ?? '');
  const [errors, setErrors] = useState<{ name?: string; identifier?: string; submit?: string }>({});
  const [producers, setProducers] = useState<ProducerOption[]>(() => {
    if (isEditing) {
      return allProducers.map((p) => {
        const checked = existingProducerIds.includes(p.id);
        return {
          id: p.id,
          name: p.name,
          farm: p.farm,
          checked,
          order: checked ? existingProducerIds.indexOf(p.id) + 1 : 0,
        };
      });
    }
    return allProducers.map((p, i) => ({
      id: p.id,
      name: p.name,
      farm: p.farm,
      checked: i < 3,
      order: i < 3 ? i + 1 : 0,
    }));
  });

  const checkedCount = producers.filter((p) => p.checked).length;

  function toggleProducer(id: string) {
    setProducers((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, checked: !p.checked } : p,
      );
      let order = 1;
      return next.map((p) => {
        if (p.checked) {
          const o = order;
          order += 1;
          return { ...p, order: o };
        }
        return { ...p, order: 0 };
      });
    });
  }

  // FR-5.4 — nome obrigatório; identificador obrigatório e único.
  function validate(): boolean {
    const next: { name?: string; identifier?: string } = {};
    if (!requiredText(name)) next.name = 'Informe o nome da rota.';
    if (!requiredText(identifier)) next.identifier = 'Informe o identificador.';
    else if (isRouteIdentifierTaken(identifier, routeId)) next.identifier = 'Identificador já em uso.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    const producerIds = producers.flatMap((p) => (p.checked ? [p.id] : []));
    try {
      if (isEditing) {
        updateRoute({
          id: routeId,
          name: name.trim(),
          identifier: identifier.trim(),
          producerIds,
        });
      } else {
        createRoute({
          name: name.trim(),
          identifier: identifier.trim(),
          producerIds,
        });
      }
      navigation.goBack();
    } catch {
      setErrors((e) => ({ ...e, submit: 'Não foi possível salvar a rota. Tente novamente.' }));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={isEditing ? 'Editar rota' : 'Nova rota'}
        subtitle="Sequência de coleta"
        onBack={() => navigation.goBack()}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Field
          label="Nome da rota"
          value={name}
          onChangeText={(v) => { setName(v); setErrors((e) => ({ ...e, name: undefined })); }}
          error={errors.name}
        />
        <Field
          label="Identificador"
          value={identifier}
          onChangeText={(v) => { setIdentifier(v); setErrors((e) => ({ ...e, identifier: undefined })); }}
          error={errors.identifier}
          suffix={<Text style={styles.charHint}>4 caracteres</Text>}
        />

        <Text style={styles.sectionLabel}>
          Produtores nesta rota{' '}
          <Text style={styles.sectionLabelCount}>· {checkedCount} selecionados</Text>
        </Text>

        <Card style={styles.producerCard}>
          {producers.map((p, i) => (
            <React.Fragment key={p.id}>
              {i > 0 && <Divider />}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.producerRow}
                onPress={() => toggleProducer(p.id)}
              >
                <View
                  style={[
                    styles.checkbox,
                    p.checked && styles.checkboxActive,
                  ]}
                >
                  {p.checked && <CheckIcon size={14} color="#fff" />}
                </View>
                <View style={styles.producerAvatar}>
                  <Text style={styles.producerAvatarText}>
                    {p.name.split(' ').map((s: string) => s[0]).slice(0, 2).join('')}
                  </Text>
                </View>
                <View style={styles.producerInfo}>
                  <Text style={styles.producerName}>{p.name}</Text>
                  <Text style={styles.producerFarm}>{p.farm}</Text>
                </View>
                {p.checked && (
                  <View style={styles.orderBadge}>
                    <Text style={styles.orderText}>{p.order}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </Card>

        {errors.submit ? (
          <Text style={{ fontSize: 13, color: colors.danger, marginTop: 12 }}>{errors.submit}</Text>
        ) : null}
      </ScrollView>

      <View style={footerStyles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[footerStyles.footerBtn, footerStyles.footerBtnSecondary]}
          onPress={() => navigation.goBack()}
        >
          <Text style={footerStyles.footerBtnSecondaryText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[footerStyles.footerBtn, footerStyles.footerBtnPrimary]}
          onPress={handleSave}
        >
          <CheckIcon size={20} color="#fff" />
          <Text style={footerStyles.footerBtnPrimaryText}>{isEditing ? 'Salvar' : 'Salvar rota'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
