import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../global/@types/navigation';
import { authenticate, routeForProfile } from '../service/authService';
import { CowMark } from '../global/CowMark';
import { styles } from '../global/styles';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

// Tela de login comum aos perfis — RF-01 / REQ-01.1, REQ-01.5.
export function LoginPage() {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState('joao@coopvaleleite.coop.br');
  const [password, setPassword] = useState('milkroute');

  function handleLogin() {
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

        <Text style={styles.fieldLabel}>E-mail</Text>
        <View style={styles.fieldBox}>
          <TextInput
            style={styles.fieldInput}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com.br"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Text style={styles.fieldLabel}>Senha</Text>
        <View style={styles.fieldBox}>
          <TextInput
            style={styles.fieldInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Sua senha"
            secureTextEntry
          />
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Tecnologia que fala a língua do campo.</Text>
      </View>
    </SafeAreaView>
  );
}
