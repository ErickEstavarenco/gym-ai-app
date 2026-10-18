import React, { createContext, useState, useContext, useCallback } from 'react';

const WorkoutContext = createContext();

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout deve ser usado dentro de WorkoutProvider');
  }
  return context;
};

export const WorkoutProvider = ({ children }) => {
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [currentDiet, setCurrentDiet] = useState(null);
  const [savedDiets, setSavedDiets] = useState([]);
  const [userProfile, setUserProfile] = useState({
    objective: 'hipertrofia',
    level: 'intermediário',
    daysPerWeek: 4,
    sessionDuration: 60,
    equipment: ['barra', 'halteres', 'máquinas'],
    restrictions: [],
    preferences: {}
  });
  const [activeSplitId, setActiveSplitId] = useState(() => {
    try {
      return localStorage.getItem('activeSplitId') || null;
    } catch {
      return null;
    }
  });

  // Treino
  const saveWorkout = useCallback((workout) => {
    const workoutWithId = {
      ...workout,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      active: true
    };
    setSavedWorkouts(prev => [workoutWithId, ...prev]);
    setCurrentWorkout(workoutWithId);
    return workoutWithId;
  }, []);

  const deleteWorkout = useCallback((id) => {
    setSavedWorkouts(prev => prev.filter(w => w.id !== id));
    if (currentWorkout?.id === id) {
      setCurrentWorkout(null);
    }
  }, [currentWorkout]);

  const updateWorkout = useCallback((id, updates) => {
    setSavedWorkouts(prev =>
      prev.map(w => w.id === id ? { ...w, ...updates } : w)
    );
    if (currentWorkout?.id === id) {
      setCurrentWorkout(prev => ({ ...prev, ...updates }));
    }
  }, [currentWorkout]);

  const setActiveWorkout = useCallback((id) => {
    const workout = savedWorkouts.find(w => w.id === id);
    if (workout) {
      setCurrentWorkout(workout);
    }
  }, [savedWorkouts]);

  // Dieta
  const saveDiet = useCallback((diet) => {
    const dietWithId = {
      ...diet,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      active: true
    };
    setSavedDiets(prev => [dietWithId, ...prev]);
    setCurrentDiet(dietWithId);
    return dietWithId;
  }, []);

  const deleteDiet = useCallback((id) => {
    setSavedDiets(prev => prev.filter(d => d.id !== id));
    if (currentDiet?.id === id) {
      setCurrentDiet(null);
    }
  }, [currentDiet]);

  const updateDiet = useCallback((id, updates) => {
    setSavedDiets(prev =>
      prev.map(d => d.id === id ? { ...d, ...updates } : d)
    );
    if (currentDiet?.id === id) {
      setCurrentDiet(prev => ({ ...prev, ...updates }));
    }
  }, [currentDiet]);

  const setActiveDiet = useCallback((id) => {
    const diet = savedDiets.find(d => d.id === id);
    if (diet) {
      setCurrentDiet(diet);
    }
  }, [savedDiets]);

  // Perfil do usuário
  const updateUserProfile = useCallback((updates) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  }, []);

  // Split ativo (A/B/C). Persiste em localStorage pra sobreviver a reloads.
  const setActiveSplit = useCallback((id) => {
    setActiveSplitId(id);
    try {
      if (id) localStorage.setItem('activeSplitId', id);
      else localStorage.removeItem('activeSplitId');
    } catch {
      // localStorage pode falhar em iframes restritos; não bloqueia.
    }
  }, []);

  const value = {
    // Treino
    currentWorkout,
    savedWorkouts,
    saveWorkout,
    deleteWorkout,
    updateWorkout,
    setActiveWorkout,

    // Dieta
    currentDiet,
    savedDiets,
    saveDiet,
    deleteDiet,
    updateDiet,
    setActiveDiet,

    // Perfil
    userProfile,
    updateUserProfile,

    // Split ativo
    activeSplitId,
    setActiveSplit
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;
