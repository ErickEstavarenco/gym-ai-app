import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, BarChart2, Utensils, Settings, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutGrid, path: '/', label: 'Plan' },
    { icon: BarChart2, path: '/stats', label: 'Stats' },
    { icon: Utensils, path: '/diet', label: 'Diet' },
    { icon: Settings, path: '/profile', label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gym-dark/80 backdrop-blur-xl border-t border-slate-800 px-8 py-4 flex justify-between items-center z-40">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-gym-orange' : 'text-slate-500 hover:text-gym-orange'
            }`}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
