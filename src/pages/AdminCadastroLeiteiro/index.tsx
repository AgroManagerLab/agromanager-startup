import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader, Field, CheckIcon } from '../../components';
import { createMilkman, getRoutes } from '../../services/adminService';
import { generatePassword } from '../../utils/password';
import { styles, footerStyles } from './styles';

export function AdminCadastroLeiteiroPage() {
  const navigation = useNavigation();
  const routes = getRoutes();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>([]);

  function handleGenerate() {
    setPassword(generatePassword());
  }

  function toggleRoute(id: string) {
    setSelectedRouteIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  }

  function handleSave() {
    if (!name.trim() || !email.trim() || !password.trim()) return;
    createMilkman({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      routeIds: selectedRouteIds,
    });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Novo leiteiro" subtitle="Dados de acesso e rotas" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Field label="Nome completo" value={name} onChangeText={setName} />
        <Field
          label="E-mail (usado para login)"
          value={email}
          onChangeText={setEmail}
        />
        <Field
          label="Senha inicial"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          suffix={
            <TouchableOpacity activeOpacity={0.7} onPress={handleGenerate}>
              <Text style={styles.gerarButton}>GERAR</Text>
            </TouchableOpacity>
          }
        />

        <Text style={styles.sectionLabel}>
          Rotas vinculadas{' '}
          <Text style={styles.sectionLabelCount}>· {selectedRouteIds.length} selecionadas</Text>
        </Text>

        <View style={styles.chipRow}>
          {routes.map((r) => {
            const checked = selectedRouteIds.includes(r.id);
            return (
              <TouchableOpacity
                key={r.id}
                activeOpacity={0.7}
                style={[
                  styles.chip,
                  checked && styles.chipActive,
                ]}
                onPress={() => toggleRoute(r.id)}
              >
                <View style={[
                  styles.chipRadio,
                  checked && styles.chipRadioActive,
                ]}>
                  {checked && <View style={styles.chipRadioInner} />}
                </View>
                <Text style={[
                  styles.chipLabel,
                  checked && styles.chipLabelActive,
                ]}>
                  {r.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
          <Text style={footerStyles.footerBtnPrimaryText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
