import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CircularProgress: React.FC<{ percentage: number; color: string; label: string }> = ({ percentage, color, label }) => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="var(--chart-track)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-black text-[var(--text-main)]">{Math.round(percentage)}%</span>
        <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
};

const Tests: React.FC = () => {
  const navigate = useNavigate();
  const [activeTest, setActiveTest] = useState<null | number>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const tests = [
    { 
        id: 0, 
        title: 'Stress Pulse', 
        questions: [
            "How often do you feel unable to control important things in your life?",
            "How often have you felt confident about your ability to handle your problems?",
            "How often have you felt that things were going your way?",
            "How often have you found that you could not cope with all the things you had to do?",
            "How often have you felt difficulties were piling up so high that you could not overcome them?"
        ],
        desc: "Rapid psychometric audit based on PSS-10 scales.",
        colorClasses: "from-cyan-400 to-blue-500",
        stroke: "#00f2fe"
    },
    { 
        id: 1, 
        title: 'Anxiety Matrix', 
        questions: [
            "Feeling nervous, anxious, or on edge?",
            "Not being able to stop or control worrying?",
            "Worrying too much about different things?",
            "Trouble relaxing?",
            "Being so restless that it is hard to sit still?"
        ],
        desc: "Neural pattern detection for high-anxiety states.",
        colorClasses: "from-pink-400 to-rose-500",
        stroke: "#fb89fb"
    },
    { id: 2, title: 'Burnout Audit', desc: "Check if your academic energy is reaching critical levels.", questions: [], colorClasses: "from-amber-400 to-orange-500", stroke: "#f9d423" },
    { id: 3, title: 'Mood Velocity', desc: "Analyze your emotional fluctuations over 168 hours.", questions: [], colorClasses: "from-purple-400 to-indigo-600", stroke: "#667eea" }
  ];

  const handleStart = (id: number) => {
    setActiveTest(id);
    setStep(0);
    setAnswers([]);
    setCopyStatus('idle');
  };

  const handleAnswer = (val: number) => {
    const newAnswers = [...answers, val];
    if (step < tests[activeTest!].questions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      setAnswers(newAnswers);
      setStep(-1);
    }
  };

  const calculateResult = () => {
    const sum = answers.reduce((a, b) => a + b, 0);
    const maxPossible = answers.length * 3;
    const percentage = (sum / maxPossible) * 100;
    
    let outcome = { label: 'Optimal', insight: 'Neural balance confirmed. Stay on your current path.', percentage };
    if (percentage > 33) outcome = { label: 'Balanced', insight: 'Minor interference detected. Recommended: Mindfulness or talking session.', percentage };
    if (percentage > 66) outcome = { label: 'Elevated', insight: 'High systemic load. Please engage SOS or connect with a professional.', percentage };
    
    return outcome;
  };

  const handleShare = async () => {
    const result = calculateResult();
    const testTitle = tests[activeTest!].title;
    const shareText = `🧠 MindSpace Campus Labs: My ${testTitle} result is ${result.label.toUpperCase()}. Insight: ${result.insight}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-40">
      <div className="mb-20 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 italic text-[var(--text-main)]">Mind Labs</h1>
        <p className="text-[var(--text-muted)] uppercase tracking-[0.3em] text-[10px] font-bold">Data-Driven Awareness • Non-Diagnostic</p>
      </div>

      <AnimatePresence mode="wait">
        {activeTest === null ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {tests.map((test) => (
              <motion.div 
                key={test.id}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-12 rounded-[48px] flex flex-col justify-between group overflow-hidden relative"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${test.colorClasses} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
                <div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${test.colorClasses} rounded-2xl flex items-center justify-center mb-8 shadow-xl text-2xl`}>
                    🧪
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-[var(--text-main)]">{test.title}</h3>
                  <p className="text-[var(--text-muted)] text-[13px] font-bold uppercase tracking-wide leading-relaxed mb-10">{test.desc}</p>
                </div>
                <button 
                  onClick={() => handleStart(test.id)}
                  disabled={test.questions.length === 0}
                  className="w-full py-5 bg-[var(--text-main)] text-[var(--bg-dark)] rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:opacity-80 transition-all disabled:opacity-20"
                >
                  {test.questions.length > 0 ? 'Initialize Lab' : 'Locked'}
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : step === -1 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto glass-morphism p-16 rounded-[64px] text-center border border-[var(--border-color)]"
          >
            <h2 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.5em] mb-12">Diagnostic Complete</h2>
            
            <div className="flex justify-center mb-12">
               <CircularProgress 
                  percentage={calculateResult().percentage} 
                  color={tests[activeTest].stroke} 
                  label="Index Score"
               />
            </div>

            <div className="text-5xl font-black italic uppercase tracking-tighter mb-6 text-[var(--text-main)]">
                {calculateResult().label}
            </div>
            <p className="text-[var(--text-muted)] mb-12 font-medium leading-relaxed uppercase text-xs tracking-widest px-8">
                {calculateResult().insight}
            </p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleShare}
                className={`py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 ${
                  copyStatus === 'copied' ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                }`}
              >
                {copyStatus === 'copied' ? 'Result Copied' : 'Share Analysis'}
              </button>
              <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setActiveTest(null)} className="py-5 glass-card rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-main)]">Return</button>
                  <button onClick={() => navigate('/talk')} className="py-5 bg-gradient-to-r from-cyan-400 to-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Talk Now</button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="mb-16">
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter text-[var(--text-main)]">{tests[activeTest].title}</h2>
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.3em]">Module {step + 1} / {tests[activeTest].questions.length}</span>
                </div>
                <div className="h-2 bg-[var(--chart-track)] rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / tests[activeTest].questions.length) * 100}%` }}
                        className={`h-full bg-gradient-to-r ${tests[activeTest].colorClasses}`}
                    />
                </div>
            </div>

            <div className="glass-morphism p-16 rounded-[48px] border border-[var(--border-color)] mb-10 flex items-center justify-center text-center shadow-lg">
                <p className="text-2xl font-black text-[var(--text-main)] leading-tight uppercase italic">{tests[activeTest].questions[step]}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Never', val: 0 },
                { label: 'Rarely', val: 1 },
                { label: 'Often', val: 2 },
                { label: 'Always', val: 3 },
              ].map((opt) => (
                <button 
                    key={opt.val}
                    onClick={() => handleAnswer(opt.val)}
                    className="p-6 glass-card rounded-2xl text-[var(--text-muted)] hover:text-cyan-500 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all font-black uppercase text-[10px] tracking-widest"
                >
                    {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tests;