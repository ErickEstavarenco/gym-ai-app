import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Weight, Ruler, Target, Zap, LogOut, ChevronRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';

const goalOptions = [
  { value: 'hipertrofia', label: 'Hipertrofia', desc: 'Ganho de massa muscular' },
  { value: 'emagrecimento', label: 'Emagrecimento', desc: 'Perda de gordura' },
  { value: 'condicionamento', label: 'Condicionamento', desc: 'Resistência e saúde' },
  { value: 'forca', label: 'Força', desc: 'Máxima força bruta' },
];

const levelOptions = [
  { value: 'iniciante', label: 'Iniciante', desc: 'Menos de 1 ano' },
  { value: 'intermediario', label: 'Intermediário', desc: '1 a 3 anos' },
  { value: 'avancado', label: 'Avançado', desc: 'Mais de 3 anos' },
];

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || '',
    weight: user?.weight || '',
    height: user?.height || '',
    goal: user?.goal || '',
    level: user?.level || '',
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    if (updateProfile) {
      await updateProfile(form);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gym-dark text-white pb-24">
      {/* Header */}
      <div className="p-6 pt-12">
        <p className="text-gym-muted text-sm uppercase tracking-widest">Configurações</p>
        <h1 className="text-4xl font-black mt-1">PERFIL</h1>
      </div>

      {/* Avatar */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gym-orange rounded-3xl flex items-center justify-center">
            <span className="text-2xl font-black">{(user?.name || 'U')[0].toUpperCase()}</span>
          </div>
          <div>
            <p className="font-black text-xl">{user?.name || 'Usuário'}</p>
            <p className="text-gym-muted text-sm">{user?.email || ''}</p>
          </div>
        </div>
      </div>

      {/* Dados físicos */}
      <div className="px-6 mb-6">
        <p className="text-xs text-gym-muted uppercase font-bold tracking-widest mb-3">Dados físicos</p>
        <div className="space-y-3">
          <div className="bg-gym-card rounded-2xl p-4 border border-white/5 flex items-center gap-3">
            <User size={18} className="text-gym-orange flex-shrink-0" />
            <input
              className="bg-transparent text-sm font-bold flex-1 outline-none placeholder:text-gym-muted"
              placeholder="Seu nome"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <div className="bg-gym-card rounded-2xl p-4 border border-white/5 flex items-center gap-3 flex-1">
              <Weight size={18} className="text-gym-orange flex-shrink-0" />
              <input
                className="bg-transparent text-sm font-bold w-full outline-none placeholder:text-gym-muted"
                placeholder="Peso (kg)"
                type="number"
                value={form.weight}
                onChange={e => handleChange('weight', e.target.value)}
              />
            </div>
            <div className="bg-gym-card rounded-2xl p-4 border border-white/5 flex items-center gap-3 flex-1">
              <Ruler size={18} className="text-gym-orange flex-shrink-0" />
              <input
                className="bg-transparent text-sm font-bold w-full outline-none placeholder:text-gym-muted"
                placeholder="Altura (cm)"
                type="number"
                value={form.height}
                onChange={e => handleChange('height', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Objetivo */}
      <div className="px-6 mb-6">
        <p className="text-xs text-gym-muted uppercase font-bold tracking-widest mb-3">Objetivo</p>
        <div className="grid grid-cols-2 gap-3">
          {goalOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleChange('goal', opt.value)}
              className={`rounded-2xl p-4 text-left border transition-all ${
                form.goal === opt.value
                  ? 'bg-gym-orange border-gym-orange'
                  : 'bg-gym-card border-white/5'
              }`}
            >
              <p className="font-black text-sm">{opt.label}</p>
              <p className={`text-[10px] mt-1 ${form.goal === opt.value ? 'opacity-80' : 'text-gym-muted'}`}>{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Nível */}
      <div className="px-6 mb-8">
        <p className="text-xs text-gym-muted uppercase font-bold tracking-widest mb-3">Nível de experiência</p>
        <div className="space-y-2">
          {levelOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleChange('level', opt.value)}
              className={`w-full rounded-2xl p-4 flex justify-between items-center border transition-all ${
                form.level === opt.value
                  ? 'bg-gym-orange border-gym-orange'
                  : 'bg-gym-card border-white/5'
              }`}
            >
              <div className="text-left">
                <p className="font-black text-sm">{opt.label}</p>
                <p className={`text-[10px] mt-0.5 ${form.level === opt.value ? 'opacity-80' : 'text-gym-muted'}`}>{opt.desc}</p>
              </div>
              {form.level === opt.value && <Check size={18} />}
            </button>
          ))}
        </div>
      </div>

      {/* Botões */}
      <div className="px-6 space-y-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-gym-orange py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2"
        >
          {saving ? 'Salvando...' : saved ? <><Check size={18} /> Salvo!</> : 'Salvar alterações'}
        </motion.button>

        <button
          onClick={logout}
          className="w-full bg-gym-card border border-white/5 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-gym-muted flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Sair da conta
        </button>
      </div>

      <Navbar />
    </div>
  );
};

export default Profile;