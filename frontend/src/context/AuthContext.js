import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const stored = await SecureStore.getItemAsync('auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        setToken(parsed.token);
        setUser(parsed.user);
        setAuthToken(parsed.token);
      }
      setLoading(false);
    };

    bootstrap();
  }, []);

  const persist = async (payload) => {
    setToken(payload.token);
    setUser(payload.user);
    setAuthToken(payload.token);
    await SecureStore.setItemAsync('auth', JSON.stringify(payload));
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    await persist(data);
  };

  const signup = async (name, email, password, role = 'student') => {
    const { data } = await api.post('/auth/signup', { name, email, password, role });
    await persist(data);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    await SecureStore.deleteItemAsync('auth');
  };

  const value = useMemo(
    () => ({ user, token, loading, login, signup, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
