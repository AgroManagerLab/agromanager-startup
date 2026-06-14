import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CowMark, MailIcon, LockIcon, AlertIcon } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { styles } from './styles';

export function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('joao@coopvaleleite.coop.br');
  const [password, setPassword] = useState('milkroute');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);
  const [error, setError] = useState(false);

  function handleLogin() {
    const ok = signIn(email, password);
    setError(!ok);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <CowMark size={156} />
          <View style={styles.brandCopy}>
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
