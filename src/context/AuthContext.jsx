import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Modo de desenvolvimento - define como true para testar sem backend
// Em produção configure VITE_DEV_MODE=false no .env
const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Configuração da API (usar backend local em 5001 + rota /api)
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
    timeout: 5000,
  });

  useEffect(() => {
    if (DEV_MODE && !token) {
      // Modo desenvolvimento: usuário de teste
      setUser({ id: 1, name: 'Teste', email: 'teste@teste.com' });
      setLoading(false);
      return;
    }

    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['x-auth-token'] = token;
      loadUser();
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['x-auth-token'];
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const res = await api.get('/auth/profile');
      setUser(res.data);
    } catch (err) {
      console.error("Erro ao carregar usuário:", err);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    if (DEV_MODE) {
      // Modo desenvolvimento: login simulado
      setUser({ id: 1, name: 'Teste', email });
      return { success: true };
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.msg || "Erro ao fazer login. Verifique se o servidor está rodando."
      };
    }
  };

  const register = async (name, email, password) => {
    if (DEV_MODE) {
      // Modo desenvolvimento: registro simulado
      setUser({ id: 1, name, email });
      return { success: true };
    }

    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data.token) {
        setToken(res.data.token);
      } else {
        return await login(email, password);
      }
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.msg || "Erro ao registrar. Verifique se o servidor está rodando."
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};