import React from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { AuthNavigator } from '../routes/auth';
import { AppNavigator } from '../routes/app';

function RootScreensInner() {
  const { profile } = useAuth();
  return profile ? <AppNavigator /> : <AuthNavigator />;
}

export default function RootScreens() {
  return (
    <AuthProvider>
      <RootScreensInner />
    </AuthProvider>
  );
}
