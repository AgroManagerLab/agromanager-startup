import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Field } from '../../components/Field';
import { RouteIcon, ChevronIcon, CheckIcon } from '../../components/icons/Icon';
import {
  createProducer,
  getProducerById,
  getRoutes,
  isProducerEmailTaken,
  updateProducer,
} from '../../services/adminService';
import { colors } from '../../global/themes';
import { generatePassword } from '../../utils/password';
import { isValidEmail, minLength, requiredText } from '../../utils/validation';
import { styles, footerStyles } from './styles';

interface FieldErrors {
  name?: string;
  farm?: string;
  email?: string;
  route?: string;
  password?: string;
  submit?: string;
}

export function AdminRegisterProducerPage() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'AdminRegisterProducer'>>();
  const producerId = route.params?.producerId;
  const isEditing = !!producerId;

  const routes = getRoutes();
  const existing = isEditing ? getProducerById(producerId) : null;

  const [name, setName] = useState(existing?.name ?? '');
  const [farm, setFarm] = useState(existing?.farm ?? '');
  const [email, setEmail] = useState(existing?.email ?? '');
  const [selectedRouteId, setSelectedRouteId] = useState(
    isEditing ? (existing?.route_id ?? '') : (routes[0]?.id ?? ''),
  );
  const [password, setPassword] = useState('');
  const [showRoutePicker, setShowRoutePicker] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const selectedRoute = routes.find((r) => r.id === selectedRouteId);

  function handleGenerate() {
    setPassword(generatePassword());
  }

  // FR-5.2 — validação de nome, fazenda, e-mail, rota e senha (na criação).
  function validate(): boolean {
    const next: FieldErrors = {};
    if (!requiredText(name)) next.name = 'Informe o nome.';
    if (!requiredText(farm)) next.farm = 'Informe a fazenda.';
    if (!requiredText(email)) next.email = 'Informe o e-mail.';
    else if (!isValidEmail(email)) next.email = 'E-mail inválido.';
    else if (isProducerEmailTaken(email, producerId)) next.email = 'E-mail já cadastrado.';
    if (!selectedRouteId) next.route = 'Selecione uma rota.';
    if (!isEditing && !minLength(password, 4)) next.password = 'Mínimo de 4 caracteres.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    try {
      if (isEditing) {
        updateProducer({
          id: producerId,
          name: name.trim(),
          farm: farm.trim(),
          email: email.trim(),
          routeId: selectedRouteId,
        });
      } else {
        createProducer({
          name: name.trim(),
          farm: farm.trim(),
          email: email.trim(),
          routeId: selectedRouteId,
          password: password.trim(),
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
        title={isEditing ? 'Editar produtor' : 'Novo produtor'}
        subtitle={isEditing ? 'Dados cadastrais' : 'Dados cadastrais e acesso'}
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
          label="Identificador da fazenda"
          value={farm}
          onChangeText={(v) => { setFarm(v); setErrors((e) => ({ ...e, farm: undefined })); }}
          error={errors.farm}
        />
        <Field
          label="E-mail (usado para login)"
          value={email}
          onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: undefined })); }}
          error={errors.email}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowRoutePicker(!showRoutePicker)}
        >
          <Field
            label="Rota associada"
            value={selectedRoute?.name ?? 'Selecione uma rota'}
            editable={false}
            error={errors.route}
            icon={<View style={styles.routeIconWrap}><RouteIcon size={16} color={colors.primaryDark} /></View>}
            suffix={<ChevronIcon size={14} color={colors.ink3} />}
          />
        </TouchableOpacity>

        {showRoutePicker && (
          <View style={styles.picker}>
            {routes.map((r) => (
              <TouchableOpacity
                key={r.id}
                activeOpacity={0.7}
                style={[styles.pickerItem, r.id === selectedRouteId && styles.pickerItemActive]}
                onPress={() => {
                  setSelectedRouteId(r.id);
                  setErrors((e) => ({ ...e, route: undefined }));
                  setShowRoutePicker(false);
                }}
              >
                <Text style={[styles.pickerText, r.id === selectedRouteId && styles.pickerTextActive]}>
                  {r.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!isEditing && (
          <Field
            label="Senha inicial"
            value={password}
            onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: undefined })); }}
            secureTextEntry
            error={errors.password}
            hint="O produtor poderá alterar no primeiro acesso."
            suffix={
              <TouchableOpacity activeOpacity={0.7} onPress={handleGenerate}>
                <Text style={styles.gerarButton}>GERAR</Text>
              </TouchableOpacity>
            }
          />
        )}

        {errors.submit ? (
          <Text style={{ fontSize: 13, color: colors.danger, marginTop: 8 }}>{errors.submit}</Text>
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
          <Text style={footerStyles.footerBtnPrimaryText}>
            {isEditing ? 'Salvar' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
