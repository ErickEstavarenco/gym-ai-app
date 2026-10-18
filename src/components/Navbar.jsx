import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, BarChart2, Utensils, User as UserIcon, MessageCircle, Dumbbell } from 'lucide-react';
import Logo from './ui/Logo';

const navItems = [
  { icon: LayoutGrid, path: '/', label: 'Plan' },
  { icon: BarChart2, path: '/stats', label: 'Stats' },
  { icon: MessageCircle, path: '/chat', label: 'AI' },
  { icon: Utensils, path: '/diet', label: 'Diet' },
  { icon: UserIcon, path: '/profile', label: 'Perfil' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pointer-events-none">
      <div className="max-w-md mx-auto glass-strong border border-gym-line rounded-3xl shadow-card-elevated pointer-events-auto relative overflow-hidden">
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gym-accent/30 to-transparent" />

        <div className="flex items-center px-3 py-2.5">
          {/* Brand mark on the left */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-shrink-0 mr-1 group"
            aria-label="Início"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gym-accent to-gym-accent-hover flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform">
              <Dumbbell size={18} className="text-white" strokeWidth={2.5} />
            </div>
          </button>

          {/* Nav items */}
          <div className="flex-1 flex justify-around items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center justify-center py-2 px-1.5 group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-gym-accent-muted rounded-2xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.div
                    animate={isActive ? { y: -2 } : { y: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`relative z-10 ${
                      isActive ? 'text-gym-accent' : 'text-gym-text-muted group-hover:text-gym-text-primary'
                    } transition-colors`}
                  >
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>
                  <span
                    className={`relative z-10 text-[9px] font-bold uppercase tracking-tight mt-0.5 ${
                      isActive ? 'text-gym-accent' : 'text-gym-text-muted group-hover:text-gym-text-primary'
                    } transition-colors`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;