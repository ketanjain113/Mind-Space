
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

interface Props {
  setIsLoggedIn: (val: boolean) => void;
}

const Signup: React.FC<Props> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock successful signup
    setIsLoggedIn(true);
    navigate('/profile');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="glass-card p-12 rounded-[64px] border border-white/10 space-y-10 shadow-2xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-[var(--text-main)]">JOIN SANCTUARY.</h1>
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.4em] max-w-xs mx-auto">
              Decouple your identity. Reclaim your well-being.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-cyan-400 ml-4">Neural Alias</label>
                <input 
                  type="text" 
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="e.g. QuietSeeker_92"
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-white outline-none focus:border-cyan-400/40 transition-all font-medium"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-indigo-400 ml-4">Campus Node (Email)</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-white outline-none focus:border-indigo-400/40 transition-all font-medium"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-pink-400 ml-4">Access Key</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create strong key"
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-white outline-none focus:border-pink-400/40 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex gap-4">
                <div className="mt-1">
                    <div className="w-4 h-4 bg-cyan-400/20 rounded border border-cyan-400/40 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(0,242,254,1)]" />
                    </div>
                </div>
                <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider leading-relaxed">
                  I understand that MindSpace is an anonymous sanctuary and does not replace professional medical intervention.
                </p>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white rounded-3xl font-black uppercase text-[11px] tracking-[0.4em] shadow-xl hover:scale-[1.01] active:scale-95 transition-all"
            >
              Initialize Sync
            </button>
          </form>

          <div className="pt-6 border-t border-white/5 text-center">
            <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-white transition-colors">
              Already a Node? Access Vault
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
