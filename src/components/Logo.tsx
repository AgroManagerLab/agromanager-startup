import React from 'react';
import { Image, ImageStyle } from 'react-native';

interface LogoProps {
  size?: number;
  style?: ImageStyle;
}

const WIDTH = 630;
const HEIGHT = 851;
const RATIO = WIDTH / HEIGHT;

export function Logo({ size = 156, style }: LogoProps) {
  return (
    <Image
      source={require('../../assets/images/logo.png')}
      style={[
        {
          width: size,
          height: size / RATIO,
          resizeMode: 'contain',
        },
        style,
      ]}
    />
  );
}
