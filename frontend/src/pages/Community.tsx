import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'wall' | 'vibe'>('sessions');
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());

  const upcomingSessions = [
    { 
      id: '1', 
      topic: 'Overcoming Academic Fatigue', 
      speaker: 'Dr. Sarah Mitchell', 
      time: 'Tomorrow, 2:00 PM', 
      attendees: 42, 
      tagStyles: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500',
      glowStyles: 'bg-cyan-500/5'
    },
    { 
      id: '2', 
      topic: 'Mindful Social Media Use', 
      speaker: 'James Clear', 
      time: 'Friday, 10:00 AM', 
      attendees: 156, 
      tagStyles: 'bg-pink-500/10 border-pink-500/30 text-pink-500',
      glowStyles: 'bg-pink-500/5'
    },
  ];

  const wallPosts = [
    { id: '1', author: 'Phantom_92', content: "Finally finished my midterms. Feeling relieved but exhausted. Anyone else feeling the void?", reactions: 24, time: '2h ago' },
    { id: '2', author: 'ZenStudent', content: "Just a reminder that you're doing your best, and that's enough. Take a deep breath today.", reactions: 112, time: '5h ago' },
  ];

  const handleRegister = (id: string) => {
    setRegisteredIds(prev => new Set(prev).add(id));
  };

  return (
    <div className="max-w-[1400px] mx-auto px-12 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
        <div className="space-y-4">
            <h1 className="text-6xl font-black italic uppercase tracking-tighter text-[var(--text-main)]">Collective <span className="vibrant-gradient-text">Sync.</span></h1>
            <p className="text-[var(--text-muted)] text-lg uppercase tracking-widest font-medium">Shared experiences in a decentralized sanctuary.</p>
        </div>
        
        <div className="flex p-2 bg-[var(--input-bg)] rounded-[32px] border border-[var(--border-color)] backdrop-blur-xl">
          {[
              { id: 'sessions', label: 'LIVE CIRCLES' },
              { id: 'wall', label: 'ANONYMOUS WALL' },
              { id: 'vibe', label: 'VIBE MAP' }
          ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-10 py-4 rounded-[24px] text-[11px] font-black tracking-[0.2em] transition-all ${activeTab === tab.id ? 'bg-[var(--text-main)] text-[var(--bg-dark)] shadow-xl' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
              >
                {tab.label}
              </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'sessions' ? (
            <div className="grid lg:grid-cols-2 gap-12">
              {upcomingSessions.map(session => (
                <div key={session.id} className="glass-card p-16 rounded-[60px] relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-48 h-48 ${session.glowStyles} blur-[80px]`} />
                  <div className="flex justify-between items-start mb-10">
                      <div className={`px-5 py-2 border text-[10px] font-black uppercase tracking-widest rounded-full ${session.tagStyles}`}>
                          LIVE CIRCLE
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase">{session.time}</span>
                  </div>
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-[var(--text-main)] group-hover:vibrant-gradient-text transition-all">{session.topic}</h3>
                  <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest mb-12">Moderated by {session.speaker}</p>
                  <div className="flex items-center justify-between">
                      <div className="flex -space-x-4">
                          {[1,2,3,4].map(i => <img key={i} src={`https://picsum.photos/seed/${i+50}/40`} className="w-12 h-12 rounded-full border-4 border-[var(--bg-dark)]" alt="User" />)}
                          <div className="w-12 h-12 rounded-full border-4 border-[var(--bg-dark)] bg-[var(--input-bg)] flex items-center justify-center text-[10px] font-black text-[var(--text-muted)]">
                            +{session.attendees}
                          </div>
                      </div>
                      
                      <motion.button 
                        layout
                        initial={false}
                        onClick={() => handleRegister(session.id)}
                        disabled={registeredIds.has(session.id)}
                        className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl flex items-center gap-3 ${
                          registeredIds.has(session.id) 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-[var(--text-main)] text-[var(--bg-dark)] hover:bg-cyan-500 hover:text-white'
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {registeredIds.has(session.id) ? (
                            <motion.div 
                              key="registered" 
                              initial={{ opacity: 0, scale: 0.5 }} 
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                              REGISTERED
                            </motion.div>
                          ) : (
                            <motion.span key="secure" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              SECURE SPOT
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                  </div>
                  {registeredIds.has(session.id) && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-green-400 uppercase tracking-widest text-center w-full"
                    >
                      Calendar invitation sent to your hub
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
          ) : activeTab === 'vibe' ? (
            <div className="glass-card p-24 rounded-[80px] text-center space-y-12">
                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-[var(--text-main)]">Current Campus Pulse</h3>
                <div className="relative h-96 w-full max-w-4xl mx-auto overflow-hidden rounded-[48px] bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center">
                    <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-2 p-10 opacity-10">
                        {Array.from({ length: 100 }).map((_, i) => (
                            <div key={i} className={`w-full h-full rounded-full ${i % 3 === 0 ? 'bg-cyan-400' : 'bg-pink-500'}`} />
                        ))}
                    </div>
                    <div className="relative z-10 space-y-4">
                        <span className="text-8xl font-black italic tracking-tighter uppercase text-[var(--text-main)]">Optimistic</span>
                        <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.6em] text-xs">84% Consensus</p>
                    </div>
                </div>
                <button className="px-12 py-5 bg-[var(--input-bg)] rounded-full border border-[var(--border-color)] text-[10px] font-black uppercase tracking-widest text-[var(--text-main)] hover:bg-white/10 transition-all">Submit My Vibe</button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="glass-card p-12 rounded-[50px] border border-[var(--border-color)] shadow-2xl bg-[var(--input-bg)]">
                  <textarea 
                      placeholder="Surrender a thought anonymously..."
                      className="w-full h-40 bg-transparent rounded-[32px] border border-[var(--border-color)] text-[var(--text-main)] p-8 placeholder:text-[var(--text-muted)] text-xl font-medium italic outline-none focus:border-cyan-500/30 transition-all"
                  ></textarea>
                  <div className="flex justify-between items-center mt-8">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.5em] font-black">GUIDELINE: RADIATE EMPATHY</span>
                      <button className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-indigo-600 text-white rounded-[20px] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">POST TO VOID</button>
                  </div>
              </div>

              {wallPosts.map(post => (
                <motion.div 
                  key={post.id}
                  className="glass-card p-12 rounded-[50px] border border-[var(--border-color)] relative group"
                >
                  <div className="flex justify-between items-center mb-6">
                      <span className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.3em]">@{post.author}</span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">{post.time}</span>
                  </div>
                  <p className="text-xl text-[var(--text-main)] opacity-70 font-medium leading-relaxed italic mb-10 group-hover:opacity-100 transition-opacity">"{post.content}"</p>
                  <div className="flex items-center gap-6">
                      <button className="flex items-center gap-3 px-6 py-3 bg-[var(--input-bg)] rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:text-cyan-500 hover:border-cyan-500 transition-all">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth={2.5}/></svg>
                          <span className="text-xs font-black uppercase tracking-widest">{post.reactions}</span>
                      </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Community;