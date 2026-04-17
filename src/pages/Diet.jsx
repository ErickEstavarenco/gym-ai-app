import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Flame, Droplets, Beef, Wheat, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';

const Diet = () => {
  const [activeTab, setActiveTab] = useState('hoje');

  const macros = [
    { label: 'Proteína', value: 180, goal: 200, unit: 'g', color: 'bg-gym-orange' },
    { label: 'Carboidrato', value: 240, goal: 300, unit: 'g', color: 'bg-blue-500' },
    { label: 'Gordura', value: 55, goal: 70, unit: 'g', color: 'bg-yellow-500' },
  ];

  const meals = [
    {
      time: '07:00', name: 'Café da manhã', calories: 520,
      items: ['Ovos mexidos (3 un)', 'Pão integral (2 fatias)', 'Banana (1 un)'],
    },
    {
      time: '12:30', name: 'Almoço', calories: 780,
      items: ['Frango grelhado (200g)', 'Arroz integral (150g)', 'Brócolis (100g)'],
    },
    {
      time: '16:00', name: 'Pré-treino', calories: 310,
      items: ['Whey protein (1 dose)', 'Batata doce (100g)'],
    },
    {
      time: '20:00', name: 'Jantar', calories: 640,
      items: ['Salmão (180g)', 'Quinoa (100g)', 'Salada verde'],
    },
  ];

  return (
    <div className="min-h-screen bg-gym-dark text-white pb-24">
      {/* Header */}
      <div className="p-6 pt-12">
        <p className="text-gym-muted text-sm uppercase tracking-widest">Alimentação</p>
        <h1 className="text-4xl font-black mt-1">DIETA</h1>
      </div>

      {/* Calorias totais */}
      <div className="px-6 mb-6">
        <div className="bg-gym-orange rounded-3xl p-6 relative overflow-hidden">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Calorias hoje</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-5xl font-black">2.250</span>
            <span className="text-lg font-bold opacity-70 mb-1">/ 2.600 kcal</span>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div className="bg-white rounded-full h-2" style={{ width: '87%' }} />
          </div>
          <Flame className="absolute -right-4 -bottom-4 opacity-10" size={120} />
        </div>
      </div>

      {/* Macros */}
      <div className="px-6 mb-6">
        <p className="text-xs text-gym-muted uppercase font-bold tracking-widest mb-3">Macronutrientes</p>
        <div className="space-y-3">
          {macros.map((m, i) => (
            <div key={i} className="bg-gym-card rounded-2xl p-4 border border-white/5">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold">{m.label}</span>
                <span className="text-sm font-black">{m.value}<span className="text-gym-muted font-normal">/{m.goal}{m.unit}</span></span>
              </div>
              <div className="bg-white/10 rounded-full h-1.5">
                <div
                  className={`${m.color} rounded-full h-1.5 transition-all`}
                  style={{ width: `${Math.min((m.value / m.goal) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refeições */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gym-muted uppercase font-bold tracking-widest">Refeições</p>
          <button className="bg-gym-orange p-2 rounded-xl">
            <Plus size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {meals.map((meal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-gym-card rounded-2xl p-5 border border-white/5"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-black text-sm">{meal.name}</p>
                  <p className="text-[10px] text-gym-muted mt-0.5">{meal.time}</p>
                </div>
                <span className="text-gym-orange font-black text-sm">{meal.calories} kcal</span>
              </div>
              <div className="space-y-1">
                {meal.items.map((item, j) => (
                  <p key={j} className="text-xs text-gym-muted flex items-center gap-2">
                    <span className="w-1 h-1 bg-gym-orange rounded-full inline-block" />
                    {item}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Diet;