
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

interface Props {
  setIsLoggedIn: (val: boolean) => void;
}

const Login: React.FC<Props> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock successful login
    setIsLoggedIn(true);
    navigate('/profile');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-12 rounded-[64px] border border-white/10 space-y-10 shadow-2xl">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-[var(--text-main)]">MIND LOGIN.</h1>
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.4em]">Initialize Authentication Protocol</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-cyan-400 ml-4">Campus Alias / Email</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="phantom_student"
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-white outline-none focus:border-cyan-400/40 transition-all font-medium"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-pink-400 ml-4">Secure Key</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-white outline-none focus:border-pink-400/40 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-cyan-400 to-indigo-600 text-white rounded-3xl font-black uppercase text-[11px] tracking-[0.4em] shadow-xl hover:scale-[1.02] transition-all"
            >
              Access Vault
            </button>
          </form>

          <div className="pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <Link to="/signup" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-white transition-colors">
              New Node? Join the Sanctuary
            </Link>
            <button className="text-[9px] font-bold text-white/20 uppercase tracking-widest hover:text-cyan-400 transition-colors">
              Forgot Access Key?
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
