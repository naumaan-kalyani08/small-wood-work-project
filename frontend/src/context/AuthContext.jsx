import { createContext, useContext, useMemo, useState } from 'react';
import { apiRequest } from '../CommonUtilities/CommonFunctions';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const isAuthenticated = Boolean(token);

  const login = async (credentials) => {
    const result = await apiRequest({
      endpoint: '/login',
      method: 'POST',
      body: credentials,
    });

    if (result.success && result.data) {
      const data = result.data;
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
    }

    return result;
  };

  const register = async (payload) => {
    const result = await apiRequest({
      endpoint: '/register',
      method: 'POST',
      body: payload,
    });

    if (result.success && result.data) {
      const data = result.data;
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
    }

    return result;
  };

  const logout = async () => {
    try {
      if (token) {
        await apiRequest({
          endpoint: '/logout',
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          showMessage: false,
        });
      }
    } catch (e) {
      // ignore errors; still clear local state
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    }
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      register,
      logout,
      authHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    }),
    [token, user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
