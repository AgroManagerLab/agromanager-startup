import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader, Field, RouteIcon, ChevronIcon, CheckIcon } from '../../components';
import { createProducer, getRoutes } from '../../services/adminService';
import { colors } from '../../global/themes';
import { generatePassword } from '../../utils/password';
import { styles, footerStyles } from './styles';

export function AdminCadastroProdutorPage() {
  const navigation = useNavigation();
  const routes = getRoutes();

  const [name, setName] = useState('');
  const [farm, setFarm] = useState('');
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0]?.id ?? '');
  const [password, setPassword] = useState('');
  const [showRoutePicker, setShowRoutePicker] = useState(false);

  const selectedRoute = routes.find((r) => r.id === selectedRouteId);

  function handleGenerate() {
    setPassword(generatePassword());
  }

  function handleSave() {
    if (!name.trim() || !farm.trim() || !selectedRouteId || !password.trim()) return;
    createProducer({
      name: name.trim(),
      farm: farm.trim(),
      routeId: selectedRouteId,
      password: password.trim(),
    });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Novo produtor" subtitle="Dados cadastrais e acesso" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Field label="Nome completo" value={name} onChangeText={setName} />
        <Field label="Identificador da fazenda" value={farm} onChangeText={setFarm} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowRoutePicker(!showRoutePicker)}
        >
          <Field
            label="Rota associada"
            value={selectedRoute?.name ?? 'Selecione uma rota'}
            editable={false}
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

        <Field
          label="Senha inicial"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          hint="O produtor poderá alterar no primeiro acesso."
          suffix={
            <TouchableOpacity activeOpacity={0.7} onPress={handleGenerate}>
              <Text style={styles.gerarButton}>GERAR</Text>
            </TouchableOpacity>
          }
        />
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
