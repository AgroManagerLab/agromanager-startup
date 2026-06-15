import React from 'react';
import { Logo } from './Logo';

interface WordmarkProps {
  tone?: 'light' | 'dark';
}

export function Wordmark({ tone: _tone }: WordmarkProps) {
  return <Logo size={60} />;
}
