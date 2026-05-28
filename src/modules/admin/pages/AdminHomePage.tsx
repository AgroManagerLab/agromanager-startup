import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../global/@types/navigation';
import { styles } from '../global/styles';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Admin'>;

// SCAFFOLD — módulo Admin (Cooperativa). RF-02 a implementar em rodada futura.
export function AdminHomePage() {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cooperativa</Text>
        <Text style={styles.subtitle}>Módulo do administrador em breve.</Text>
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
