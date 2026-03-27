import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, ChevronRight, Plus, Apple, Coffee, Sun, Moon } from 'lucide-react';
import Navbar from '../components/Navbar';

const Diet = () => {
  const meals = [
    {
      id: 1,
      name: 'Café da Manhã',
      time: '07:00',
      icon: Sun,
      calories: 450,
      items: ['3 ovos mexidos', '1 fatia de pão integral', '1 banana'],
      completed: true
    },
    {
      id: 2,
      name: 'Lanche da Manhã',
      time: '10:00',
      icon: Coffee,
      calories: 200,
      items: ['1 maçã', '30g de castanhas'],
      completed: true
    },
    {
      id: 3,
      name: 'Almoço',
      time: '12:30',
      icon: Utensils,
      calories: 650,
      items: ['150g de peito de frango', '100g de arroz', 'Salada verde'],
      completed: false
    },
    {
      id: 4,
      name: 'Lanche da Tarde',
      time: '16:00',
      icon: Coffee,
      calories: 300,
      items: ['1 iogurte natural', '1 scoop de whey'],
      completed: false
    },
    {
      id: 5,
      name: 'Jantar',
      time: '19:30',
      icon: Moon,
      calories: 550,
      items: ['150g de peixe', 'Legumes no vapor', 'Batata doce'],
      completed: false
    }
  ];

  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  const completedMeals = meals.filter(m => m.completed).length;

  return (
    <div className="min-h-screen bg-gym-dark text-white pb-24">
      {/* Header */}
      <div className="p-6 pt-12">
        <h1 className="text-3xl font-black">Plano Alimentar</h1>
        <p className="text-gym-muted mt-1">Sua nutrição diária</p>
      </div>

      {/* Resumo */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gym-card rounded-2xl p-5 border border-white/5"
          >
            <Apple size={24} className="text-gym-orange mb-3" />
            <p className="text-2xl font-black">{totalCalories}</p>
            <p className="text-xs text-gym-muted uppercase tracking-wider">Calorias</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gym-card rounded-2xl p-5 border border-white/5"
          >
            <Utensils size={24} className="text-green-400 mb-3" />
            <p className="text-2xl font-black">{completedMeals}/{meals.length}</p>
            <p className="text-xs text-gym-muted uppercase tracking-wider">Refeições</p>
          </motion.div>
        </div>
      </div>

      {/* Refeições */}
      <div className="px-6 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Hoje</h2>
          <button className="text-gym-orange text-sm font-semibold flex items-center gap-1">
            <Plus size={16} /> Adicionar
          </button>
        </div>

        {meals.map((meal, index) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gym-card rounded-2xl p-5 border border-white/5 flex items-center gap-4 ${
              meal.completed ? 'opacity-60' : ''
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              meal.completed ? 'bg-green-500/20' : 'bg-gym-orange/20'
            }`}>
              <meal.icon size={24} className={meal.completed ? 'text-green-400' : 'text-gym-orange'} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold">{meal.name}</h3>
                <span className="text-xs text-gym-muted">{meal.time}</span>
              </div>
              <p className="text-sm text-gym-muted mt-1">{meal.calories} kcal</p>
              <p className="text-xs text-gym-muted mt-1">{meal.items.join(', ')}</p>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <ChevronRight size={20} className="text-gym-muted" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Dica da IA */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-r from-gym-orange/20 to-gym-accent/10 border border-gym-orange/20 rounded-2xl p-5">
          <h3 className="font-bold text-gym-orange mb-2">💡 Dica da IA</h3>
          <p className="text-sm text-gym-muted">
            Você está consumindo proteína suficiente! Para ganho de massa, tente adicionar mais 20g de proteína no pós-treino.
          </p>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Diet;