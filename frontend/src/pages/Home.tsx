import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const Neural3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particlesCount = 400;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 40;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.1,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 20;

    const animate = () => {
      points.rotation.y += 0.0008;
      points.rotation.x += 0.0004;
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
};

const NeuralBrain: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
      {/* Neural Atmosphere */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-pink-500/20 blur-[120px] rounded-full pointer-events-none" 
      />
      
      {/* Radiating Pulses */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 2, opacity: [0, 0.1, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          }}
          className="absolute inset-0 rounded-full border border-cyan-400/30"
        />
      ))}

      {/* The Brain Core */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative z-10 w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
      >
        <svg viewBox="0 0 512 512" className="w-full h-full drop-shadow-[0_0_30px_rgba(0,242,254,0.4)]">
          <defs>
            <linearGradient id="brain-grad-hero" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="50%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#fb89fb" />
            </linearGradient>
            <filter id="glow-hero">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer Energy Shell */}
          <motion.circle 
            cx="256" cy="256" r="240" 
            stroke="url(#brain-grad-hero)" 
            strokeWidth="1" 
            fill="none" 
            strokeDasharray="10, 20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            opacity="0.3"
          />

          {/* Neural Brain Icon */}
          <motion.path 
            d="M256,128c-61.9,0-112,50.1-112,112c0,34.5,15.6,65.3,40.1,85.8c4.6,3.9,7.9,9,7.9,15.1v55.1c0,22.1,17.9,40,40,40h48c22.1,0,40-17.9,40-40v-55.1c0-6.1,3.3-11.2,7.9-15.1c24.5-20.5,40.1-51.3,40.1-85.8C368,178.1,317.9,128,256,128z" 
            fill="#070815" 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path 
            d="M256,144c-53,0-96,43-96,96c0,29.6,13.4,56,34.4,73.5c3.9,3.3,6.6,7.7,6.6,12.9v47.2c0,13.3,10.7,24,24,24h62c13.3,0,24-10.7,24-24v-47.2c0-5.2,2.7-9.6,6.6-12.9c21-17.6,34.4-43.9,34.4-73.5C352,187,309,144,256,144z" 
            fill="url(#brain-grad-hero)" 
            filter="url(#glow-hero)"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>

        {/* Orbiting Nodes */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            >
              <div 
                className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '100%',
                  transform: 'translate(-50%, -50%)',
                  marginTop: `${(i - 3) * 15}px`
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const BreathingCenter: React.FC = () => {
  const [phase, setPhase] = useState<'In' | 'Hold' | 'Out'>('In');
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    let timer: number;
    const runCycle = () => {
      setPhase('In');
      timer = window.setTimeout(() => {
        setPhase('Hold');
        timer = window.setTimeout(() => {
          setPhase('Out');
          timer = window.setTimeout(runCycle, 6000);
        }, 4000);
      }, 4000);
    };
    runCycle();
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="glass-card p-16 rounded-[80px] flex flex-col items-center justify-center text-center space-y-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="space-y-4 relative z-10">
        <h3 className="text-3xl font-black uppercase italic tracking-tighter text-[var(--text-main)]">Breathing Sanctuary</h3>
        <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.5em]">Synchronize your physiological frequency</p>
      </div>
      
      <div className="relative w-64 h-64 flex items-center justify-center">
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.1, scale: phase === 'In' ? 2 : phase === 'Hold' ? 2 : 0.8 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-cyan-400 blur-2xl"
            />
          )}
        </AnimatePresence>
        
        <motion.div
          animate={active ? {
            scale: phase === 'In' ? 1.6 : phase === 'Hold' ? 1.6 : 0.8,
            backgroundColor: phase === 'In' ? 'rgba(0, 242, 254, 0.4)' : phase === 'Hold' ? 'rgba(102, 126, 234, 0.4)' : 'rgba(251, 137, 251, 0.4)'
          } : { scale: 1 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="w-40 h-40 rounded-full border-4 border-white/10 flex items-center justify-center shadow-2xl z-10"
        >
          <div className="text-white font-black uppercase tracking-tighter flex flex-col items-center">
            <span className="text-sm opacity-50 mb-1">{active ? 'Status' : 'System'}</span>
            <span className="text-xl">{active ? phase : 'Ready'}</span>
          </div>
        </motion.div>
      </div>

      <div className="z-10 max-w-md">
        <p className="text-[var(--text-muted)] text-sm font-medium leading-loose mb-10">
          The 4-7-8 method. Proven to lower cortisol and reset the vagus nerve. 
          Use this whenever academic pressure feels overwhelming.
        </p>
        <button 
          onClick={() => setActive(!active)}
          className={`px-12 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.4em] transition-all shadow-xl ${
            active ? 'bg-white/10 text-white border border-white/20' : 'bg-cyan-400 text-black hover:scale-105'
          }`}
        >
          {active ? 'Terminate Flow' : 'Begin Resonance'}
        </button>
      </div>
    </div>
  );
};

const Home: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="relative">
      <Neural3DBackground />

      {/* SWAPPED HERO SECTION: BRANDING ON LEFT, BRAIN ON RIGHT */}
      <section className="relative min-h-screen flex items-center px-12 md:px-24 overflow-hidden pt-20">
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="w-full grid lg:grid-cols-2 gap-20 items-center max-w-[1600px] mx-auto z-10"
        >
          {/* LEFT: MIND SPACE BRANDING */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-left flex flex-col items-start space-y-10"
          >
            <div className="space-y-4">
              <span className="text-cyan-400 text-[11px] font-black uppercase tracking-[0.6em] block">
                Academic Sanctuary Protocol v3.1
              </span>
              <h1 className="text-8xl md:text-[10rem] xl:text-[13rem] font-black italic uppercase tracking-tighter leading-[0.8] text-[var(--text-main)] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                MIND <br /> <span className="vibrant-gradient-text">SPACE.</span>
              </h1>
              <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.3em] text-[13px] mt-10 max-w-xl leading-relaxed">
                De-stigmatizing mental well-being through <br />
                <span className="text-[var(--text-main)]">Anonymous Neural Architecture.</span>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-10">
              <button 
                onClick={() => navigate(isLoggedIn ? '/talk' : '/signup')} 
                className="px-14 py-7 bg-white text-black rounded-full font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl hover:bg-cyan-400 transition-all active:scale-95"
              >
                {isLoggedIn ? 'Access Sanctuary' : 'Establish Node'}
              </button>
              <button 
                onClick={() => navigate('/community')} 
                className="px-12 py-7 glass-card rounded-full font-black uppercase text-[11px] tracking-[0.4em] text-[var(--text-main)] hover:border-white transition-all"
              >
                Explore Sync
              </button>
            </div>
          </motion.div>

          {/* RIGHT: INTERACTIVE BRAIN ELEMENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <NeuralBrain />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)]">Descend</span>
          <div className="w-0.5 h-16 bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
      </section>

      {/* THE SANCTUARY LIFECYCLE SECTION */}
      <section className="max-w-7xl mx-auto px-10 py-40">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[var(--text-main)]">The Sanctuary <span className="vibrant-gradient-text">Lifecycle.</span></h2>
          <p className="text-[var(--text-muted)] font-bold uppercase tracking-[0.5em] text-[10px]">Your path to emotional equilibrium</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              step: "01", 
              title: "Pulse Check", 
              desc: "Start with an anonymous diagnostic. Understand your current stress levels through clinical-grade psychometrics.",
              icon: "🧪",
              color: "text-cyan-400"
            },
            { 
              step: "02", 
              title: "Neural Session", 
              desc: "Engage in end-to-end encrypted dialogue with MindSpace AI. Safe, private, and available 24/7.",
              icon: "💬",
              color: "text-indigo-400"
            },
            { 
              step: "03", 
              title: "Collective Sync", 
              desc: "Transition to shared circles. Realize you aren't alone through anonymous community interaction.",
              icon: "⭕",
              color: "text-pink-400"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-12 rounded-[60px] relative overflow-hidden group"
            >
              <span className="absolute top-8 right-8 text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors">{item.step}</span>
              <div className={`text-4xl mb-10 ${item.color}`}>{item.icon}</div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-[var(--text-main)]">{item.title}</h3>
              <p className="text-[var(--text-muted)] text-sm leading-loose font-medium">{item.desc}</p>
              <div className="mt-10 h-1 w-0 bg-cyan-400 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* BREATHING CENTER */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <BreathingCenter />
        </motion.div>
      </section>

      {/* CORE INFO: ABOUT MINDSPACE */}
      <section className="max-w-7xl mx-auto px-10 py-40">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-10">
            <h2 className="text-6xl font-black italic uppercase tracking-tighter text-[var(--text-main)] leading-[0.9]">
              Designed for <br />the <span className="vibrant-gradient-text">Modern Student.</span>
            </h2>
            <div className="space-y-6 text-lg text-[var(--text-muted)] leading-relaxed font-medium">
              <p>Academic life has shifted. The pressures of the digital age require a new kind of support system—one that respects your privacy as much as your mental health.</p>
              <p>MindSpace Campus utilizes advanced Large Language Models specifically tuned for student empathy. Our "Zero-Log" policy ensures that your vulnerability is never a liability.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="p-8 glass-card rounded-[40px] border border-cyan-500/10">
                <div className="text-4xl font-black text-cyan-400 mb-2">100%</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Encrypted Privacy</div>
              </div>
              <div className="p-8 glass-card rounded-[40px] border-white/5">
                <div className="text-4xl font-black text-white mb-2">24/7</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Live Presence</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="glass-card p-12 rounded-[60px] border-white/10 relative z-10">
              <h4 className="text-xl font-black uppercase italic tracking-tighter text-[var(--text-main)] mb-8">Platform Architecture</h4>
              <div className="space-y-8">
                {[
                  { label: "Neural Layer", status: "Active", color: "bg-green-400" },
                  { label: "Encryption Vault", status: "Isolated", color: "bg-cyan-400" },
                  { label: "Student Node Mesh", status: "Syncing", color: "bg-indigo-400" }
                ].map((node, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--text-main)]">{node.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{node.status}</span>
                      <div className={`w-2 h-2 rounded-full ${node.color} animate-pulse`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-600/10 blur-[100px] rounded-full" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-60 text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-card p-32 rounded-[120px] border border-white/5 space-y-12 relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-pink-500/5" />
           <h2 className="text-7xl font-black italic uppercase tracking-tighter text-[var(--text-main)] leading-none relative z-10">
            Restore Your <br /><span className="vibrant-gradient-text">Inner Balance.</span>
           </h2>
           <p className="text-[var(--text-muted)] uppercase tracking-[0.6em] text-[11px] font-black px-20 leading-loose relative z-10">
             Your sanctuary is waiting. Join the network of thousands of students reclaiming their mental space today.
           </p>
           <div className="relative z-10">
             <button 
               onClick={() => navigate('/signup')}
               className="px-16 py-8 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-500 text-white rounded-full font-black uppercase text-sm tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
             >
               Initialize Sanctuary Now
             </button>
           </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;