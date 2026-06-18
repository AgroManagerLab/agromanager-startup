import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { MilkrouteLogo } from '../../components/MilkrouteLogo';
import { MailIcon, LockIcon, AlertIcon } from '../../components/AuthIcons';
import { colors } from '../../global/themes';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail, requiredText } from '../../utils/validation';
import { styles } from './styles';

function DevEntry({
  label,
  email,
  color,
}: {
  label: string;
  email: string;
  color: string;
}) {
  const { signIn } = useAuth();
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => signIn(email, 'milkroute')}
      style={[styles.devBtn, { backgroundColor: color }]}
    >
      <Text style={styles.devBtnLabel}>{label}</Text>
      <Text style={styles.devBtnEmail}>{email}</Text>
    </TouchableOpacity>
  );
}

export function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);
  const [error, setError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [recoveryRequested, setRecoveryRequested] = useState(false);

  function handleEmailChange(value: string) {
    setEmail(value);
    setError(false);
    setFieldErrors((e) => ({ ...e, email: undefined }));
    setRecoveryRequested(false);
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    setError(false);
    setFieldErrors((e) => ({ ...e, password: undefined }));
  }

  // Valida formato/obrigatoriedade antes de tentar autenticar. FR-5.6.
  function validate(): boolean {
    const next: { email?: string; password?: string } = {};
    if (!requiredText(email)) next.email = 'Informe seu e-mail.';
    else if (!isValidEmail(email)) next.email = 'E-mail inválido.';
    if (!requiredText(password)) next.password = 'Informe sua senha.';
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleLogin() {
    setRecoveryRequested(false);
    if (!validate()) {
      setError(false);
      return;
    }
    const ok = signIn(email, password);
    setError(!ok);
  }

  function handleForgotPassword() {
    setError(false);
    setRecoveryRequested(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          <View style={styles.brand}>
            <MilkrouteLogo size={180} />
            <Text style={styles.brandTitle}>Milkroute</Text>
          </View>

          <View style={styles.spacer} />

          <View style={styles.formSection}>
            <Text style={styles.welcomeTitle}>Bem-vindo de volta</Text>
            <Text style={styles.welcomeSubtitle}>Entre com a sua conta da cooperativa</Text>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>E-mail</Text>
              <View style={[
                styles.fieldBox,
                focused === 'email' && styles.fieldBoxFocused,
                fieldErrors.email && { borderColor: colors.danger },
              ]}>
                <MailIcon />
                <TextInput
                  style={styles.fieldInput}
                  value={email}
                  onChangeText={handleEmailChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="seu@email.com.br"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {fieldErrors.email ? (
                <Text style={styles.fieldError}>{fieldErrors.email}</Text>
              ) : null}
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Senha</Text>
              <View style={[
                styles.fieldBox,
                focused === 'password' && styles.fieldBoxFocused,
                fieldErrors.password && { borderColor: colors.danger },
              ]}>
                <LockIcon />
                <TextInput
                  style={styles.fieldInput}
                  value={password}
                  onChangeText={handlePasswordChange}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="Sua senha"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPassword((v) => !v)}>
                  <Text style={styles.fieldSuffix}>{showPassword ? 'OCULTAR' : 'MOSTRAR'}</Text>
                </TouchableOpacity>
              </View>
              {fieldErrors.password ? (
                <Text style={styles.fieldError}>{fieldErrors.password}</Text>
              ) : null}
            </View>

            {error && (
              <View style={styles.errorBox}>
                <AlertIcon />
                <View style={styles.errorContent}>
                  <Text style={styles.errorTitle}>E-mail ou senha incorretos</Text>
                  <Text style={styles.errorDescription}>Verifique seus dados e tente novamente.</Text>
                </View>
              </View>
            )}

            <View style={styles.forgotWrap}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleForgotPassword}
                style={styles.forgotButton}
              >
                <Text style={styles.forgot}>Esqueci a senha</Text>
              </TouchableOpacity>
            </View>

            {recoveryRequested && (
              <View style={styles.recoveryBox}>
                <MailIcon color={colors.primary} />
                <View style={styles.recoveryContent}>
                  <Text style={styles.recoveryTitle}>Recuperação solicitada</Text>
                  <Text style={styles.recoveryDescription}>
                    A cooperativa usará {email || 'seu e-mail'} para orientar a troca da senha.
                  </Text>
                </View>
              </View>
            )}

            <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>
              Ainda não é cooperado? <Text style={styles.footerStrong}>Fale com sua cooperativa</Text>
            </Text>
          </View>

          {/* Dev quick-login card — só em desenvolvimento (FR-4.6) */}
          {__DEV__ && (
          <Card style={styles.devCard}>
            <View style={styles.devHeader}>
              <View style={styles.devBadge}>
                <Text style={styles.devBadgeText}>DEV</Text>
              </View>
              <Text style={styles.devTitle}>Acesso rápido</Text>
            </View>
            <DevEntry
              label="Administrador"
              email="admin@coopvaleleite.coop.br"
              color={colors.primaryDark}
            />
            <DevEntry
              label="Leiteiro"
              email="ricardo@coopvaleleite.coop.br"
              color={colors.primary}
            />
            <DevEntry
              label="Produtor"
              email="joao@coopvaleleite.coop.br"
              color={colors.pending}
            />
          </Card>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
