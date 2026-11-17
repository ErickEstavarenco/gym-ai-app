import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  Bell,
  BellOff,
  Goal,
  HelpCircle,
  LogOut,
  Edit2,
  Ruler,
  Weight,
  Target,
  User,
  X,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  PageShell,
  SectionHeader,
  Stat,
  Toggle,
} from '../components/ui';
import { fadeUp, staggerParent } from '../lib/motion';

// Rótulos exibidos; o valor persistido no banco é o identificador (chave).
const OBJECTIVE_OPTIONS = [
  { value: 'hipertrofia', label: 'Massa' },
  { value: 'emagrecimento', label: 'Emagrecimento' },
  { value: 'definicao', label: 'Definição' },
  { value: 'forca', label: 'Força' },
  { value: 'resistencia', label: 'Resistência' },
];
const objectiveLabel = (value) =>
  OBJECTIVE_OPTIONS.find((o) => o.value === value)?.label || '';

const buildEditData = (u) => ({
  name: u?.name || 'Usuário',
  height: u?.height != null ? String(u.height) : '',
  weight: u?.weight != null ? String(u.weight) : '',
  age: u?.age != null ? String(u.age) : '',
  objective: u?.objective || '',
});

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(() => buildEditData(user));

  useEffect(() => {
    if (user) setEditData(buildEditData(user));
  }, [user]);

  const handleEditChange = (field, value) =>
    setEditData((prev) => ({ ...prev, [field]: value }));

  const handleSaveEdit = async () => {
    const result = await updateProfile({
      name: editData.name,
      height: editData.height,
      weight: editData.weight,
      age: editData.age,
      objective: editData.objective,
    });
    if (result.success) setIsEditing(false);
    else alert(result.message);
  };

  const handleCancelEdit = () => {
    setEditData(buildEditData(user));
    setIsEditing(false);
  };

  const userInitial = (editData.name || 'U')[0].toUpperCase();

  return (
    <PageShell
      header={
        <SectionHeader kicker="CONTA" title="PROFILE" subtitle="Seus dados e configurações" />
      }
    >
      <motion.div
        variants={staggerParent(0.08)}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Profile Hero */}
        <motion.div variants={fadeUp}>
          <Card variant="elevated" padding="lg" className="relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-44 h-44 bg-gym-accent/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-gym-accent-hover/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gym-accent to-gym-accent-hover flex items-center justify-center text-3xl font-display impact-text text-white shadow-glow-sm flex-shrink-0">
                {userInitial}
              </div>
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    className="font-display impact-text text-2xl w-full px-3 py-1.5 rounded-xl bg-gym-bg border border-gym-accent text-white outline-none"
                  />
                ) : (
                  <h2 className="font-display impact-text text-2xl text-white truncate">
                    {editData.name}
                  </h2>
                )}
                <p className="text-sm text-gym-text-secondary flex items-center gap-1.5 mt-1">
                  <Mail size={12} />
                  {user?.email || 'usuario@email.com'}
                </p>
                <div className="flex items-center gap-2 mt-2.5">
                  <Badge variant="solid" size="sm" icon={Sparkles}>
                    Premium
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    3 meses
                  </Badge>
                </div>
              </div>
              {!isEditing ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  aria-label="Editar perfil"
                >
                  <Edit2 size={16} />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="icon-sm"
                    onClick={handleSaveEdit}
                    aria-label="Salvar"
                  >
                    <Check size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleCancelEdit}
                    aria-label="Cancelar"
                  >
                    <X size={14} />
                  </Button>
                </div>
              )}
            </div>

            {/* Mini stats row */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-gym-line">
              {[
                { label: 'Treinos', value: '24', color: 'accent' },
                { label: 'Calorias', value: '12.5k', color: 'warning' },
                { label: 'Streak', value: '5', color: 'success' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className={`font-display impact-text text-2xl ${
                      stat.color === 'accent'
                        ? 'gradient-text'
                        : stat.color === 'warning'
                          ? 'text-gym-warning'
                          : 'text-gym-success'
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-gym-text-muted uppercase tracking-[0.15em] mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Body metrics */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} className="text-gym-accent" />
            <h2 className="text-xs font-bold text-gym-text-secondary uppercase tracking-[0.2em]">
              Métricas corporais
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card variant="default" padding="md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gym-accent-muted flex items-center justify-center">
                  <Ruler size={14} className="text-gym-accent" />
                </div>
                <span className="text-[10px] font-bold text-gym-text-secondary uppercase tracking-[0.15em]">
                  Altura
                </span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex.: 1,75"
                  value={editData.height}
                  onChange={(e) => handleEditChange('height', e.target.value)}
                  className="font-display impact-text text-2xl w-full px-2 py-1 rounded-lg bg-gym-bg border border-gym-accent text-white outline-none"
                />
              ) : (
                <p className="font-display impact-text text-2xl gradient-text">
                  {editData.height || '—'}
                  {editData.height && <span className="text-sm text-gym-text-muted ml-1">m</span>}
                </p>
              )}
            </Card>

            <Card variant="default" padding="md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gym-accent-muted flex items-center justify-center">
                  <Weight size={14} className="text-gym-accent" />
                </div>
                <span className="text-[10px] font-bold text-gym-text-secondary uppercase tracking-[0.15em]">
                  Peso
                </span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex.: 75"
                  value={editData.weight}
                  onChange={(e) => handleEditChange('weight', e.target.value)}
                  className="font-display impact-text text-2xl w-full px-2 py-1 rounded-lg bg-gym-bg border border-gym-accent text-white outline-none"
                />
              ) : (
                <p className="font-display impact-text text-2xl gradient-text">
                  {editData.weight || '—'}
                  {editData.weight && <span className="text-sm text-gym-text-muted ml-1">kg</span>}
                </p>
              )}
            </Card>

            <Card variant="default" padding="md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gym-accent-muted flex items-center justify-center">
                  <User size={14} className="text-gym-accent" />
                </div>
                <span className="text-[10px] font-bold text-gym-text-secondary uppercase tracking-[0.15em]">
                  Idade
                </span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex.: 25"
                  value={editData.age}
                  onChange={(e) => handleEditChange('age', e.target.value)}
                  className="font-display impact-text text-2xl w-full px-2 py-1 rounded-lg bg-gym-bg border border-gym-accent text-white outline-none"
                />
              ) : (
                <p className="font-display impact-text text-2xl gradient-text">{editData.age || '—'}</p>
              )}
            </Card>

            <Card variant="default" padding="md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gym-accent-muted flex items-center justify-center">
                  <Goal size={14} className="text-gym-accent" />
                </div>
                <span className="text-[10px] font-bold text-gym-text-secondary uppercase tracking-[0.15em]">
                  Objetivo
                </span>
              </div>
              {isEditing ? (
                <select
                  value={editData.objective}
                  onChange={(e) => handleEditChange('objective', e.target.value)}
                  className="font-display text-xl impact-text w-full px-2 py-1 rounded-lg bg-gym-bg border border-gym-accent text-white outline-none"
                >
                  <option value="">Selecione</option>
                  {OBJECTIVE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              ) : (
                <p className="font-display impact-text text-xl gradient-text">
                  {objectiveLabel(editData.objective) || '—'}
                </p>
              )}
            </Card>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div variants={fadeUp}>
          <h2 className="text-xs font-bold text-gym-text-secondary uppercase tracking-[0.2em] mb-3">
            Configurações
          </h2>
          <Card variant="default" padding="md" className="space-y-4">
            <Toggle
              checked={notifications}
              onChange={setNotifications}
              label="Notificações"
              description="Treinos, dieta e lembretes"
            />
            <div className="border-t border-gym-line pt-4">
              <button
                type="button"
                className="w-full flex items-center gap-3 text-left"
                onClick={() => alert('Abrir help center (mock)')}
              >
                <div className="w-10 h-10 rounded-xl bg-gym-surface-elevated flex items-center justify-center flex-shrink-0">
                  <HelpCircle size={18} className="text-gym-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-gym-text-primary">Ajuda & Suporte</p>
                  <p className="text-xs text-gym-text-secondary mt-0.5">
                    Central de ajuda e FAQ
                  </p>
                </div>
                <Badge variant="neutral" size="sm">
                  v1.0
                </Badge>
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div variants={fadeUp}>
          <Button
            variant="danger"
            size="lg"
            fullWidth
            onClick={logout}
            leftIcon={LogOut}
          >
            Sair da Conta
          </Button>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-center text-[10px] text-gym-text-muted uppercase tracking-[0.2em] pt-2"
        >
          Gym AI v2.0
        </motion.p>
      </motion.div>
    </PageShell>
  );
};

export default Profile;