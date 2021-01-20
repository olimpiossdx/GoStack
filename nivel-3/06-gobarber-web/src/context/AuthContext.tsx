import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredenials {
  email: string;
  password: string;
}
interface AuthContextData {
  name: string;
  singIn(credentials: SignInCredenials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const singIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Olimpio', singIn }}>
      {children}
    </AuthContext.Provider>
  );
};
