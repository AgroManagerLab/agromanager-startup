import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, ScreenHeader } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { loadMilkmanHomeData } from '../../services/milkmanService';
import { styles } from './styles';

export function MilkmanHomePage() {
  const { signOut } = useAuth();
  const data = loadMilkmanHomeData();
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={data.title} subtitle={data.description} />
      <View style={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.body}>Fluxo de registro e sincronização entra depois desta etapa.</Text>
        </Card>
        <TouchableOpacity style={styles.link} onPress={signOut}>
          <Text style={styles.linkText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
