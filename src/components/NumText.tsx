import React from 'react';
import { Text, TextProps } from 'react-native';
import { NUM_STYLE } from '../global/themes';

export function NumText({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[NUM_STYLE, style]} {...rest}>
      {children}
    </Text>
  );
}
