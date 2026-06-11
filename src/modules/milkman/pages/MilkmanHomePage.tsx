import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card, ScreenHeader } from '../../../global/ui';
import type { RootStackParamList } from '../../../global/@types/navigation';
import { loadMilkmanHomeData } from '../service/milkmanService';
import { styles } from '../global/styles';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Milkman'>;

// SCAFFOLD — módulo Leiteiro (Motorista). RF-03 a implementar em rodada futura.
export function MilkmanHomePage() {
  const navigation = useNavigation<Nav>();
  const data = loadMilkmanHomeData();
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={data.title} subtitle={data.description} />
      <View style={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.body}>Fluxo de registro e sincronização entra depois desta etapa.</Text>
        </Card>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
        >
          <Text style={styles.linkText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
