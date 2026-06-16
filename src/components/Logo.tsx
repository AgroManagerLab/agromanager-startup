import React from 'react';
import LogoSvg from '../../assets/images/logo.svg';

interface LogoProps {
  size?: number;
}

export function Logo({ size = 156 }: LogoProps) {
  return <LogoSvg width={size} height={size} />;
}
