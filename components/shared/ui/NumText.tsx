import React from 'react';
import { Text, TextProps } from 'react-native';
import { NUM_STYLE } from '../../../theme/typography';

interface NumTextProps extends Omit<TextProps, 'style'> {
  children: React.ReactNode;
  className?: string;
}

export function NumText({ children, className = '', ...rest }: NumTextProps) {
  return (
    <Text className={className} style={NUM_STYLE} {...rest}>
      {children}
    </Text>
  );
}
