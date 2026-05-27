import React from 'react';
import { View, ViewProps } from 'react-native';
import { styles } from './styles';

export function Card({ children, style, ...rest }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}
