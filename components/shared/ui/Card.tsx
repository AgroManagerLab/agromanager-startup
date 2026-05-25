import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends Omit<ViewProps, 'style'> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <View className={`bg-surface border border-border rounded-lg ${className}`} {...rest}>
      {children}
    </View>
  );
}
