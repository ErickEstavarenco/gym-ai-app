import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, BarChart2, Utensils, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutGrid, path: '/', label: 'PLAN' },
    { icon: BarChart2, path: '/stats', label: 'STATS' },
    { icon: Utensils, path: '/diet', label: 'DIET' },
    { icon: Settings, path: '/profile', label: 'SETTINGS' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gym-dark/80 backdrop-blur-xl border-t border-white/5 px-8 py-4 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-gym-orange' : 'text-gym-muted'
            }`}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-widest">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
