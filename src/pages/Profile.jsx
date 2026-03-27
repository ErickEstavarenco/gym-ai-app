import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Goal, Bell, Moon, Sun, HelpCircle, LogOut, ChevronRight, Edit2, Ruler, Weight, Target, X, Check } from 'lucide-react';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || 'Usuário',
    height: '1.75',
    weight: '75',
    age: '25',
    objective: 'Massa'
  });

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    // Aqui você salvaria os dados no backend
    setIsEditing(false);
  };

  const settings = [
    {
      icon: Goal,
      label: 'Objetivos',
      value: editData.objective,
      href: '/goals'
    },
    {
      icon: Bell,
      label: 'Notificações',
      toggle: true,
      value: notifications,
      onChange: setNotifications
    },
    {
      icon: darkMode ? Moon : Sun,
      label: darkMode ? 'Tema Escuro' : 'Tema Claro',
      toggle: true,
      value: darkMode,
      onChange: setDarkMode
    },
    {
      icon: HelpCircle,
      label: 'Ajuda & Suporte',
      href: '/help'
    },
  ];

  const stats = [
    { label: 'Treinos', value: '24', color: 'text-gym-orange' },
    { label: 'Calorias', value: '12.5k', color: 'text-orange-400' },
    { label: 'Streak', value: '5', color: 'text-yellow-400' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gym-dark text-white' : 'bg-gray-100 text-gray-900'} pb-24 transition-colors duration-300`}>
      {/* Header */}
      <header className={`pt-12 px-6 pb-6 sticky top-0 ${darkMode ? 'bg-gym-dark/80' : 'bg-white/80'} backdrop-blur-md z-30 transition-colors duration-300`}>
        <p className="text-xs font-bold text-gym-orange tracking-widest uppercase">Settings</p>
        <h1 className="font-display text-4xl impact-text mt-1">PROFILE</h1>
      </header>

      <main className="px-6 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${darkMode ? 'bg-gym-card' : 'bg-white'} rounded-3xl p-6 border ${darkMode ? 'border-slate-800' : 'border-gray-200'} relative overflow-hidden transition-colors duration-300`}
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-gym-orange to-orange-500 opacity-20 rounded-full blur-2xl"></div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gym-orange to-orange-500 flex items-center justify-center text-3xl font-display font-bold text-white">
              {editData.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className={`font-display text-2xl impact-text w-full px-2 py-1 rounded ${darkMode ? 'bg-gym-dark border-gym-orange' : 'bg-gray-100 border-gym-orange'} border`}
                />
              ) : (
                <h2 className="font-display text-2xl impact-text">{editData.name}</h2>
              )}
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'} flex items-center gap-1`}>
                <Mail size={14} /> {user?.email || 'usuario@email.com'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-gym-orange/20 text-gym-orange px-2 py-1 rounded font-bold uppercase">
                  Premium
                </span>
                <span className={`text-[10px] ${darkMode ? 'bg-white/10 text-slate-400' : 'bg-gray-200 text-gray-600'} px-2 py-1 rounded font-bold uppercase`}>
                  3 meses
                </span>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className={`p-3 ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} rounded-xl transition-colors`}
              >
                <Edit2 size={18} />
              </button>
            )}
            {isEditing && (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="p-3 bg-gym-orange hover:bg-gym-accent rounded-xl transition-colors text-white"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className={`p-3 ${darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} rounded-xl transition-colors`}
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className={`grid grid-cols-3 gap-4 mt-6 pt-6 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className={`font-display text-2xl impact-text ${stat.color}`}>{stat.value}</p>
                <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-gray-600'} uppercase tracking-wider`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid - Altura, Peso, etc */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${darkMode ? 'bg-gym-card border-slate-800' : 'bg-white border-gray-200'} p-4 rounded-2xl border transition-colors duration-300`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Ruler size={16} className="text-gym-orange" />
              <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-gray-600'} uppercase tracking-wider`}>Altura</p>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editData.height}
                onChange={(e) => handleEditChange('height', e.target.value)}
                className={`font-display text-2xl impact-text w-full px-2 py-1 rounded ${darkMode ? 'bg-gym-dark border-gym-orange' : 'bg-gray-100 border-gym-orange'} border`}
              />
            ) : (
              <p className="font-display text-2xl impact-text">{editData.height}m</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${darkMode ? 'bg-gym-card border-slate-800' : 'bg-white border-gray-200'} p-4 rounded-2xl border transition-colors duration-300`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Weight size={16} className="text-gym-orange" />
              <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-gray-600'} uppercase tracking-wider`}>Peso</p>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editData.weight}
                onChange={(e) => handleEditChange('weight', e.target.value)}
                className={`font-display text-2xl impact-text w-full px-2 py-1 rounded ${darkMode ? 'bg-gym-dark border-gym-orange' : 'bg-gray-100 border-gym-orange'} border`}
              />
            ) : (
              <p className="font-display text-2xl impact-text">{editData.weight}kg</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${darkMode ? 'bg-gym-card border-slate-800' : 'bg-white border-gray-200'} p-4 rounded-2xl border transition-colors duration-300`}
          >
            <div className="flex items-center gap-2 mb-1">
              <User size={16} className="text-gym-orange" />
              <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-gray-600'} uppercase tracking-wider`}>Idade</p>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editData.age}
                onChange={(e) => handleEditChange('age', e.target.value)}
                className={`font-display text-2xl impact-text w-full px-2 py-1 rounded ${darkMode ? 'bg-gym-dark border-gym-orange' : 'bg-gray-100 border-gym-orange'} border`}
              />
            ) : (
              <p className="font-display text-2xl impact-text">{editData.age}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${darkMode ? 'bg-gym-card border-slate-800' : 'bg-white border-gray-200'} p-4 rounded-2xl border transition-colors duration-300`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Target size={16} className="text-gym-orange" />
              <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-gray-600'} uppercase tracking-wider`}>Objetivo</p>
            </div>
            {isEditing ? (
              <select
                value={editData.objective}
                onChange={(e) => handleEditChange('objective', e.target.value)}
                className={`font-display text-xl impact-text w-full px-2 py-1 rounded ${darkMode ? 'bg-gym-dark border-gym-orange text-white' : 'bg-gray-100 border-gym-orange text-gray-900'} border`}
              >
                <option>Massa</option>
                <option>Definição</option>
                <option>Força</option>
                <option>Resistência</option>
              </select>
            ) : (
              <p className="font-display text-xl impact-text">{editData.objective}</p>
            )}
          </motion.div>
        </div>

        {/* Settings List */}
        <div className="space-y-3">
          <h3 className={`text-sm font-bold ${darkMode ? 'text-slate-400' : 'text-gray-600'} uppercase tracking-wider mb-2`}>Configurações</h3>

          {settings.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`${darkMode ? 'bg-gym-card border-slate-800' : 'bg-white border-gray-200'} rounded-2xl p-4 border flex items-center gap-4 transition-colors duration-300`}
            >
              <div className={`w-10 h-10 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-gray-100'} flex items-center justify-center`}>
                <item.icon size={20} className="text-gym-orange" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">{item.label}</h4>
                {item.value && !item.toggle && (
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{item.value}</p>
                )}
              </div>

              {item.toggle ? (
                <button
                  onClick={() => item.onChange(!item.value)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    item.value ? 'bg-gym-orange' : darkMode ? 'bg-slate-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    item.value ? 'left-7' : 'left-1'
                  }`} />
                </button>
              ) : (
                <ChevronRight size={20} className={darkMode ? 'text-slate-400' : 'text-gray-400'} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={logout}
          className={`w-full ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-300 hover:bg-gray-400'} py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors mt-8`}
        >
          <LogOut size={20} />
          Sair da Conta
        </motion.button>

        {/* App Version */}
        <p className={`text-center text-[10px] ${darkMode ? 'text-slate-500' : 'text-gray-500'} mt-8`}>
          Gym AI v1.0.0 • Build 2026.03.24
        </p>
      </main>

      <Navbar />
    </div>
  );
};

export default Profile;
