import React from 'react';
import { Image, View, Text } from 'react-native';
import { MilkBottleIcon } from './icons/Icon';
import { colors } from '../global/themes';
import { styles } from './styles';

interface PhotoStripeProps {
  uri?: string | null;
  caption?: string;
  variant?: 'sm' | 'md';
}

export function PhotoStripe({ uri, caption = '', variant = 'md' }: PhotoStripeProps) {
  const sm = variant === 'sm';
  return (
    <View style={[styles.photoBase, sm ? styles.photoSm : styles.photoMd]}>
      {uri ? (
        <Image source={{ uri }} style={[sm ? styles.photoSm : styles.photoMd, { borderWidth: 0 }]} />
      ) : caption ? (
        <Text style={styles.photoCaption}>{caption}</Text>
      ) : (
        <MilkBottleIcon size={sm ? 22 : 28} color={colors.ink3} />
      )}
    </View>
  );
}
