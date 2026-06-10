import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

interface WordmarkProps {
  tone?: 'light' | 'dark';
}

export function Wordmark({ tone = 'dark' }: WordmarkProps) {
  const light = tone === 'light';
  return (
    <View style={styles.wordmarkRow}>
      {/* TODO: substituir por asset vetorial dedicado quando o pacote visual estiver pronto. */}
      <View style={styles.wordmarkMark}>
        <Text style={styles.wordmarkMarkText}>M</Text>
      </View>
      <Text style={light ? styles.wordmarkTextLight : styles.wordmarkTextDark}>
        Milk<Text style={styles.wordmarkAccent}>Route</Text>
      </Text>
    </View>
  );
}
