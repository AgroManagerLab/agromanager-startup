import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface PhotoStripeProps {
  caption?: string;
  variant?: 'sm' | 'md';
}

export function PhotoStripe({ caption = '', variant = 'md' }: PhotoStripeProps) {
  const sm = variant === 'sm';
  return (
    <View style={[styles.photoBase, sm ? styles.photoSm : styles.photoMd]}>
      {caption ? <Text style={styles.photoCaption}>{caption}</Text> : null}
    </View>
  );
}
