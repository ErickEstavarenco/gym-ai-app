import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // CONFIGURAÇÃO DA PORTA 5000
  const api = axios.create({
    baseURL: 'http://localhost:5000', 
  } );

  useEffect(() => {
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
        message: err.response?.data?.msg || "Erro ao fazer login" 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Chamada direta para o seu backend na porta 5000
      const res = await api.post('/auth/register', { name, email, password });
      // Após registrar, fazemos o login automaticamente com o token que o backend retornar
      if (res.data.token) {
        setToken(res.data.token);
      } else {
        // Se o seu backend de registro não retorna token, fazemos login manual
        return await login(email, password);
      }
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.msg || "Erro ao registrar" 
      };
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};
