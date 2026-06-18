import React, { useState, useMemo } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../global/themes';
import { CameraIcon, CheckIcon } from '../../components/icons/Icon';
import { CameraModal } from '../../components/CameraModal';
import { Avatar } from '../../components/Avatar';
import { useAuth } from '../../context/AuthContext';
import { useConnectivity } from '../../context/ConnectivityContext';
import {
  getMilkmanRouteProducers,
  registerCollection,
} from '../../services/milkmanService';
import { isPositiveNumber, parseVolume } from '../../utils/validation';
import type { RootStackParamList } from '../../types';
import { styles } from './styles';

export function MilkmanRegisterCollectionPage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'MilkmanRegisterCollection'>>();
  const { userId } = useAuth();
  const { isConnected } = useConnectivity();
  const { producerId } = route.params;

  const producers = useMemo(() => getMilkmanRouteProducers(userId!), [userId]);
  const producer = useMemo(
    () => producers.find((p) => p.id === producerId),
    [producers, producerId],
  );
  const total = producers.length;
  const producerIndex = producers.findIndex((p) => p.id === producerId);

  const [volume, setVolume] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  if (!producer) {
    return <View style={styles.container} />;
  }

  // FR-5.5 — volume deve ser número > 0 e foto é obrigatória.
  const volumeValid = isPositiveNumber(volume);
  const volumeError = volume.trim().length > 0 && !volumeValid
    ? 'Informe um volume maior que zero.'
    : null;
  const canSubmit = photoUri !== null && volumeValid && !submitting;

  const handleConfirm = () => {
    const parsed = parseVolume(volume);
    if (parsed === null || photoUri === null || submitting) return;
    setSubmitting(true);
    try {
      registerCollection({
        producerId: producer.id,
        milkmanId: userId!,
        volume: parsed,
        photoUri,
        isConnected,
      });
      navigation.goBack();
    } catch {
      setSubmitting(false);
      Alert.alert('Erro', 'Não foi possível salvar a coleta. Tente novamente.');
    }
  };

  const handleCameraCapture = (uri: string) => {
    setPhotoUri(uri);
    setCameraOpen(false);
  };

  return (
    <View style={styles.container}>
      <CameraModal
        visible={cameraOpen}
        onCapture={handleCameraCapture}
        onClose={() => setCameraOpen(false)}
      />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>Registrar coleta</Text>
            <Text style={styles.headerSubtitle}>Confirme volume e foto da régua</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>
              {producerIndex + 1}/{total}
            </Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.body}
          bounces={false}
        >
          {/* Producer card */}
          <View style={styles.producerCard}>
            <Avatar name={producer.name} size={48} hue={producer.hue} />
            <View style={styles.producerInfo}>
              <Text style={styles.producerLabel}>Produtor</Text>
              <Text style={styles.producerName}>{producer.name}</Text>
              <Text style={styles.producerFarm}>{producer.farm}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.trocarText}>Trocar</Text>
            </TouchableOpacity>
          </View>

          {/* Volume */}
          <View style={styles.volumeSection}>
            <Text style={styles.fieldLabel}>Volume coletado</Text>
            <View
              style={[
                styles.volumeInput,
                volume.length > 0 && styles.volumeInputFocused,
              ]}
            >
              <TextInput
                value={volume}
                onChangeText={(t) => setVolume(t.replace(/[^0-9.,]/g, ''))}
                placeholder="0"
                placeholderTextColor={colors.ink3}
                keyboardType="decimal-pad"
                style={styles.volumeInputField}
              />
              <Text style={styles.volumeSuffix}>L</Text>
            </View>
            {volumeError ? (
              <Text style={{ fontSize: 13, color: colors.danger, marginTop: 8 }}>{volumeError}</Text>
            ) : null}
          </View>

          {/* Photo */}
          <View style={styles.photoSection}>
            <View style={styles.photoLabelRow}>
              <Text style={styles.fieldLabel}>Foto da régua</Text>
              <Text style={styles.photoRequired}>* obrigatória</Text>
            </View>
            {photoUri ? (
              <View style={styles.photoPreview}>
                <Image source={{ uri: photoUri }} style={styles.photoPreviewThumb} />
                <View style={styles.photoPreviewInfo}>
                  <Text style={styles.photoPreviewLabel}>Foto capturada</Text>
                  <TouchableOpacity onPress={() => setCameraOpen(true)}>
                    <Text style={styles.trocarText}>Refazer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity style={styles.photoPlaceholder} onPress={() => setCameraOpen(true)} activeOpacity={0.7}>
                <View style={styles.cameraIconWrap}>
                  <CameraIcon size={28} color={colors.contrast} />
                </View>
                <View style={styles.cameraTextWrap}>
                  <Text style={styles.cameraTitle}>Abrir câmera</Text>
                  <Text style={styles.cameraHint}>Necessária para confirmar o registro</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Offline warning — only when actually offline */}
          {!isConnected && (
            <View style={styles.offlineWarning}>
              <View style={styles.offlineIcon}>
                <Text style={styles.offlineIconText}>!</Text>
              </View>
              <Text style={styles.offlineText}>
                Sem conexão. A coleta ficará{' '}
                <Text style={styles.offlineTextBold}>pendente</Text> e sincroniza
                automaticamente quando voltar o sinal.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
          <TouchableOpacity
            style={[styles.confirmBtn, !canSubmit && styles.confirmBtnDisabled]}
            activeOpacity={0.7}
            onPress={handleConfirm}
            disabled={!canSubmit}
          >
            <CheckIcon size={20} color={canSubmit ? colors.contrast : colors.ink3} />
            <Text
              style={[
                styles.confirmBtnText,
                !canSubmit && styles.confirmBtnTextDisabled,
              ]}
            >
              Confirmar coleta
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
