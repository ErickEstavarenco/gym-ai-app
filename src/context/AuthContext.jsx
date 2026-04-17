import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const api = useMemo(() => axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  }), []);

 useEffect(() => {
  if (token) {
    localStorage.setItem('token', token);

    // 🔐 CORRETO
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    loadUser();
  } else {
    localStorage.removeItem('token');

    delete api.defaults.headers.common['Authorization'];

    setUser(null);
    setLoading(false);
  }
}, [token]);

  // Carrega perfil completo do usuário (inclui weight, height, goal, level)
  const loadUser = async () => {
    try {
      const res = await api.get('/profile');
      setUser(res.data);
    } catch (err) {
      console.error("Erro ao carregar usuário:", err);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.msg || "Erro ao fazer login",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      setToken(res.data.token);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.msg || "Erro ao registrar",
      };
    }
  };

  // Atualiza perfil do usuário (weight, height, goal, level, name)
  const updateProfile = async (profileData) => {
    try {
      const res = await api.put('/profile', profileData);
      setUser(res.data); // atualiza estado global com os novos dados
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.msg || "Erro ao atualizar perfil",
      };
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile, api }}>
      {children}
    </AuthContext.Provider>
  );
};