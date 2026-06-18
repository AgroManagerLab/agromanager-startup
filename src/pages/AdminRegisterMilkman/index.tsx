import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Field } from '../../components/Field';
import { CheckIcon } from '../../components/icons/Icon';
import {
  createMilkman,
  getMilkmanById,
  getRoutes,
  isMilkmanEmailTaken,
  updateMilkman,
} from '../../services/adminService';
import { generatePassword } from '../../utils/password';
import { isValidEmail, minLength, requiredText } from '../../utils/validation';
import { colors } from '../../global/themes';
import { styles, footerStyles } from './styles';

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  routes?: string;
  submit?: string;
}

export function AdminRegisterMilkmanPage() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'AdminRegisterMilkman'>>();
  const milkmanId = route.params?.milkmanId;
  const isEditing = !!milkmanId;

  const routes = getRoutes();
  const existing = isEditing ? getMilkmanById(milkmanId) : null;

  const [name, setName] = useState(existing?.name ?? '');
  const [email, setEmail] = useState(existing?.email ?? '');
  const [password, setPassword] = useState('');
  const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>(existing?.routeIds ?? []);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleGenerate() {
    setPassword(generatePassword());
  }

  function toggleRoute(id: string) {
    setErrors((e) => ({ ...e, routes: undefined }));
    setSelectedRouteIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  }

  // FR-5.3 — validação de nome, e-mail (formato + único), senha e ≥1 rota.
  function validate(): boolean {
    const next: FieldErrors = {};
    if (!requiredText(name)) next.name = 'Informe o nome.';
    if (!requiredText(email)) next.email = 'Informe o e-mail.';
    else if (!isValidEmail(email)) next.email = 'E-mail inválido.';
    else if (isMilkmanEmailTaken(email, milkmanId)) next.email = 'E-mail já cadastrado.';
    if (!isEditing && !minLength(password, 4)) next.password = 'Mínimo de 4 caracteres.';
    if (selectedRouteIds.length === 0) next.routes = 'Selecione ao menos uma rota.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    try {
      if (isEditing) {
        updateMilkman({
          id: milkmanId,
          name: name.trim(),
          email: email.trim(),
          password: password.trim() || undefined,
          routeIds: selectedRouteIds,
        });
      } else {
        createMilkman({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          routeIds: selectedRouteIds,
        });
      }
      navigation.goBack();
    } catch {
      setErrors((e) => ({ ...e, submit: 'Não foi possível salvar. Tente novamente.' }));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={isEditing ? 'Editar leiteiro' : 'Novo leiteiro'}
        subtitle="Dados de acesso e rotas"
        onBack={() => navigation.goBack()}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Field
          label="Nome completo"
          value={name}
          onChangeText={(v) => { setName(v); setErrors((e) => ({ ...e, name: undefined })); }}
          error={errors.name}
        />
        <Field
          label="E-mail (usado para login)"
          value={email}
          onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: undefined })); }}
          error={errors.email}
        />
        <Field
          label={isEditing ? 'Nova senha (opcional)' : 'Senha inicial'}
          value={password}
          onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: undefined })); }}
          secureTextEntry
          error={errors.password}
          hint={isEditing ? 'Deixe em branco para manter a senha atual.' : undefined}
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
        {errors.routes ? (
          <Text style={{ fontSize: 13, color: colors.danger, marginTop: 8 }}>{errors.routes}</Text>
        ) : null}

        {errors.submit ? (
          <Text style={{ fontSize: 13, color: colors.danger, marginTop: 16 }}>{errors.submit}</Text>
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
          <Text style={footerStyles.footerBtnPrimaryText}>{isEditing ? 'Salvar' : 'Cadastrar'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
