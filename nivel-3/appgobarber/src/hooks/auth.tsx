import React, { useContext, createContext, useCallback, useState, useEffect } from 'react';
import asyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredenials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  singIn(credentials: SignInCredenials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData() {
      const [token, user] = await asyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user']);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      return {} as AuthState;
    }

    loadStorageData();

    return () => {
      loadStorageData()
    }
  }, [data])

  const singIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    await asyncStorage.multiSet([['@GoBarber:token', token], ['@GoBarber:user', JSON.stringify(user)]]);

    setData({ token, user });
  }, []);

  const signOut = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCallback(async () => {
      await asyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);
      setData({} as AuthState);
    }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, singIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
