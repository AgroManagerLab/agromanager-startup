import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../global/@types/navigation';
import { authenticate, routeForProfile } from '../service/authService';
import { CowMark } from '../global/CowMark';
import { MailIcon, LockIcon, AlertIcon } from '../global/icons';
import { styles } from '../global/styles';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

// Tela de login comum aos perfis — RF-01 / REQ-01.1, REQ-01.3, REQ-01.5.
export function LoginPage() {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState('joao@coopvaleleite.coop.br');
  const [password, setPassword] = useState('milkroute');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);
  const [error, setError] = useState(false);

  function handleLogin() {
    if (!email.trim() || !password) {
      setError(true);
      return;
    }
    setError(false);
    const result = authenticate(email);
    navigation.reset({ index: 0, routes: [{ name: routeForProfile(result.profile) }] });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <CowMark size={156} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.brandTitle}>
              Milk<Text style={styles.brandAccent}>Route</Text>
            </Text>
            <Text style={styles.brandSubtitle}>Coleta de leite cooperada</Text>
          </View>
        </View>

        <Text style={styles.welcomeTitle}>Bem-vindo de volta</Text>
        <Text style={styles.welcomeSubtitle}>Entre com a sua conta da cooperativa</Text>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>E-mail</Text>
          <View style={[styles.fieldBox, focused === 'email' && styles.fieldBoxFocused]}>
            <MailIcon />
            <TextInput
              style={styles.fieldInput}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              placeholder="seu@email.com.br"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.fieldLabel}>Senha</Text>
          <View style={[styles.fieldBox, focused === 'password' && styles.fieldBoxFocused]}>
            <LockIcon />
            <TextInput
              style={styles.fieldInput}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              placeholder="Sua senha"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPassword((v) => !v)}>
              <Text style={styles.fieldSuffix}>{showPassword ? 'OCULTAR' : 'MOSTRAR'}</Text>
            </TouchableOpacity>
          </View>
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
          <Text style={styles.forgot}>Esqueci a senha</Text>
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Ainda não é cooperado? <Text style={styles.footerStrong}>Fale com sua cooperativa</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
