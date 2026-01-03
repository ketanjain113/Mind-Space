
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isLoggedIn: boolean;
}

const Logo: React.FC = () => (
  <svg viewBox="0 0 512 512" className="w-12 h-12 drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]">
    <defs>
      <linearGradient id="brain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f2fe" />
        <stop offset="50%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#fb89fb" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Radiating Rays */}
    <g strokeWidth="24" strokeLinecap="round" opacity="0.8">
      <line x1="256" y1="80" x2="256" y2="40" stroke="#f9d423" />
      <line x1="360" y1="120" x2="390" y2="80" stroke="#fb89fb" />
      <line x1="430" y1="220" x2="480" y2="210" stroke="#667eea" />
      <line x1="420" y1="340" x2="460" y2="380" stroke="#00f2fe" />
      
      <line x1="152" y1="120" x2="122" y2="80" stroke="#f9d423" opacity="0.7" />
      <line x1="82" y1="220" x2="32" y2="210" stroke="#a855f7" opacity="0.6" />
      <line x1="92" y1="340" x2="52" y2="380" stroke="#6366f1" opacity="0.5" />
    </g>

    {/* Head Silhouette */}
    <path 
      d="M256,128c-61.9,0-112,50.1-112,112c0,34.5,15.6,65.3,40.1,85.8c4.6,3.9,7.9,9,7.9,15.1v55.1c0,22.1,17.9,40,40,40h48c22.1,0,40-17.9,40-40v-55.1c0-6.1,3.3-11.2,7.9-15.1c24.5-20.5,40.1-51.3,40.1-85.8C368,178.1,317.9,128,256,128z" 
      fill="#0f172a" 
    />

    {/* Brain/Core */}
    <path 
      d="M256,144c-53,0-96,43-96,96c0,29.6,13.4,56,34.4,73.5c3.9,3.3,6.6,7.7,6.6,12.9v47.2c0,13.3,10.7,24,24,24h62c13.3,0,24-10.7,24-24v-47.2c0-5.2,2.7-9.6,6.6-12.9c21-17.6,34.4-43.9,34.4-73.5C352,187,309,144,256,144z" 
      fill="url(#brain-grad)" 
      filter="url(#glow)"
    />
  </svg>
);

const Navbar: React.FC<Props> = ({ theme, toggleTheme, isLoggedIn }) => {
  const location = useLocation();

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'TALK NOW', path: '/talk' },
    { label: 'CHECK-INS', path: '/tests' },
    { label: 'COMMUNITY', path: '/community' },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 navbar-glass h-20"
    >
      <div className="w-full h-full px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <motion.div 
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="w-14 h-14 relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-pink-500/20 blur-xl rounded-full group-hover:opacity-100 opacity-50 transition-opacity" />
            <Logo />
          </motion.div>
          <span className="text-2xl font-black tracking-tighter text-[var(--text-main)] uppercase group-hover:opacity-80 transition-opacity">MINDSPACE</span>
        </Link>

        <div className="hidden md:flex items-center gap-16">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className="relative py-2 text-[13px] font-black uppercase tracking-[0.3em] transition-all"
            >
              <span className={location.pathname === item.path ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}>
                {item.label}
              </span>
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="active-nav-line"
                  className="absolute -bottom-1 left-0 right-0 nav-underline shadow-[0_4px_15px_rgba(0,242,254,0.5)]"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          {isLoggedIn ? (
            <Link to="/profile" className="w-11 h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 to-pink-400 shadow-lg hover:scale-105 transition-transform">
              <img src="https://picsum.photos/seed/profile-vibe/100" className="w-full h-full object-cover rounded-full border border-black/20" alt="Profile" />
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-white transition-colors">Login</Link>
              <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Join</Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
