import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface ConnectivityContextValue {
  isConnected: boolean;
}

const ConnectivityContext = createContext<ConnectivityContextValue>({ isConnected: true });

export function ConnectivityProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });
    return () => unsub();
  }, []);

  return (
    <ConnectivityContext.Provider value={{ isConnected }}>
      {children}
    </ConnectivityContext.Provider>
  );
}

export function useConnectivity() {
  return useContext(ConnectivityContext);
}
