import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Field } from '../../components/Field';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { CheckIcon } from '../../components/icons/Icon';
import { createRoute, getAllProducers } from '../../services/adminService';
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
  const allProducers = getAllProducers();

  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [producers, setProducers] = useState<ProducerOption[]>(
    allProducers.map((p, i) => ({
      id: p.id,
      name: p.name,
      farm: p.farm,
      checked: i < 3,
      order: i < 3 ? i + 1 : 0,
    })),
  );

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

  function handleSave() {
    if (!name.trim() || !identifier.trim()) return;
    const producerIds = producers.flatMap((p) => (p.checked ? [p.id] : []));
    createRoute({
      name: name.trim(),
      identifier: identifier.trim(),
      producerIds,
    });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Nova rota" subtitle="Sequência de coleta" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Field label="Nome da rota" value={name} onChangeText={setName} />
        <Field
          label="Identificador"
          value={identifier}
          onChangeText={setIdentifier}
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
          <Text style={footerStyles.footerBtnPrimaryText}>Salvar rota</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
