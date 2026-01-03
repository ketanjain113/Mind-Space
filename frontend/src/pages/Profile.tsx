
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Props {
  setIsLoggedIn: (val: boolean) => void;
}

const Profile: React.FC<Props> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 transition-colors duration-300">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-10 rounded-[48px] text-center">
                <div className="w-32 h-32 rounded-[40px] bg-[var(--border-color)] border-4 border-[var(--card-bg)] mx-auto mb-6 overflow-hidden shadow-xl">
                    <img src="https://picsum.photos/seed/profile/400" className="w-full h-full object-cover" alt="Avatar" />
                </div>
                <h2 className="text-2xl font-semibold text-[var(--text-main)]">QuietSeeker_92</h2>
                <p className="text-sm text-[var(--text-muted)] font-mono mt-1">Class of 2026</p>
                
                <div className="mt-8 pt-8 border-t border-[var(--border-color)] flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--text-muted)] font-medium">Stay Anonymous</span>
                        <button 
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className={`w-12 h-6 rounded-full p-1 transition-all ${isAnonymous ? 'bg-[var(--accent-indigo)]' : 'bg-[var(--border-color)]'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isAnonymous ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="mt-8 w-full py-4 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-all"
                >
                  Terminate Session
                </button>
            </div>

            <div className="glass-card p-8 rounded-[32px] border border-[var(--border-color)]">
                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-6">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-[var(--text-main)]">12</div>
                        <div className="text-[10px] text-[var(--text-muted)] uppercase">Chats</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-[var(--text-main)]">4</div>
                        <div className="text-[10px] text-[var(--text-muted)] uppercase">Tests</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-12">
            <section>
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-semibold text-[var(--text-main)]">Mood History</h2>
                    <span className="text-xs text-[var(--text-muted)]">Last 7 Days</span>
                </div>
                <div className="glass-card p-10 rounded-[48px] h-64 flex items-end justify-between gap-4">
                    {[60, 40, 80, 50, 90, 70, 85].map((h, i) => (
                        <div key={i} className="flex-grow flex flex-col items-center gap-4">
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                className={`w-full max-w-[40px] rounded-2xl ${h > 70 ? 'bg-[var(--accent-cyan)] opacity-60' : 'bg-[var(--border-color)]'}`}
                            />
                            <span className="text-[10px] text-[var(--text-muted)] font-mono">D0{i+1}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold text-[var(--text-main)] mb-6">Saved Tests</h2>
                    <div className="space-y-4">
                        {[
                            { title: 'Stress Level', date: 'Oct 12' },
                            { title: 'Anxiety Check', date: 'Sep 28' }
                        ].map((t, i) => (
                            <div key={i} className="p-5 glass-card rounded-3xl flex justify-between items-center group cursor-pointer hover:border-[var(--accent-cyan)] transition-all">
                                <div>
                                    <h4 className="text-sm font-medium text-[var(--text-main)]">{t.title}</h4>
                                    <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase">{t.date}</span>
                                </div>
                                <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2.5}/></svg>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[var(--text-main)] mb-6">Registered Talks</h2>
                    <div className="p-8 glass-card rounded-[32px] text-center border-dashed">
                        <p className="text-sm text-[var(--text-muted)] mb-6 italic">No upcoming sessions yet.</p>
                        <button className="text-xs font-semibold text-[var(--accent-indigo)] hover:underline">Browse Sessions</button>
                    </div>
                </div>
            </section>

            <div className="p-8 bg-slate-900 rounded-[32px] text-white overflow-hidden relative group">
                <div className="relative z-10">
                    <h3 className="text-lg font-semibold mb-2">Privacy is our Priority</h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-md">Your data is encrypted and used only for your own well-being tracking. We never share personal info with the university.</p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
