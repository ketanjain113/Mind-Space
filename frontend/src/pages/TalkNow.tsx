import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getGeminiResponse } from "../services/geminiService";
import { Message } from "../../types";
import Chat from "../components/chat";

const TalkNow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Neural Sanctuary engaged. I am your MindSpace companion. Zero traces, total empathy. How is your energy field today?",
      sender: "ai",
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState("CALM");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const moodGradients: Record<string, string> = {
    CALM: "linear-gradient(135deg, rgba(0, 242, 254, 0.05) 0%, rgba(102, 126, 234, 0.05) 100%)",
    STRESSED:
      "linear-gradient(135deg, rgba(249, 212, 35, 0.05) 0%, rgba(255, 78, 80, 0.05) 100%)",
    VULNERABLE:
      "linear-gradient(135deg, rgba(251, 137, 251, 0.05) 0%, rgba(255, 107, 107, 0.05) 100%)",
    VOID: "linear-gradient(135deg, rgba(10, 11, 30, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%)",
  };

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simple Sentiment Detection for UI feedback
    const lowerText = text.toLowerCase();
    if (lowerText.match(/sad|lonely|hurt|crying|vulnerable/))
      setCurrentMood("VULNERABLE");
    else if (lowerText.match(/stress|exam|deadline|panic|anxious/))
      setCurrentMood("STRESSED");
    else if (lowerText.match(/numb|nothing|empty|void/)) setCurrentMood("VOID");
    else setCurrentMood("CALM");

    try {
      const history = messages.slice(-10).map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const response = await getGeminiResponse(text, history);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: "ai",
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const moods = [
    { label: "CALM", icon: "🌊", color: "text-cyan-400" },
    { label: "STRESSED", icon: "⚡", color: "text-amber-400" },
    { label: "VULNERABLE", icon: "💎", color: "text-pink-400" },
    { label: "VOID", icon: "🌑", color: "text-indigo-400" },
  ];

  return (
    <div className="max-w-6xl mx-auto h-[85vh] flex flex-col px-6 py-4">
      <div className="flex-grow flex gap-8 overflow-hidden">
        {/* SIDEBAR: SENTIMENT HUD */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col w-64 space-y-6"
        >
          <div className="glass-card p-8 rounded-[40px] border border-[var(--border-color)]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] text-center mb-6">
              Mood Sync
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {moods.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setCurrentMood(m.label)}
                  className={`flex flex-col items-center p-4 rounded-3xl border transition-all ${
                    currentMood === m.label
                      ? "bg-white/10 border-white/20 shadow-lg"
                      : "bg-transparent border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <span className="text-2xl mb-2">{m.icon}</span>
                  <span
                    className={`text-[8px] font-black uppercase tracking-widest ${m.color}`}
                  >
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-[40px] flex-grow flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"
            />
            <div className="text-4xl font-black italic uppercase tracking-tighter text-[var(--text-main)]">
              {currentMood}
            </div>
            <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              Active State
            </p>
          </div>
        </motion.div>

        {/* MAIN CHAT AREA */}
        <motion.div
          animate={{ background: moodGradients[currentMood] }}
          transition={{ duration: 2 }}
          className="flex-grow flex flex-col glass-morphism rounded-[50px] border border-[var(--border-color)] shadow-2xl overflow-hidden relative"
        >
          {/* Top Bar */}
          <div className="px-10 py-6 border-b border-[var(--border-color)] flex items-center justify-between bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    strokeWidth={2.5}
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-main)]">
                  Neural Sanctuary
                </h2>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                    End-to-End Encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div
            ref={scrollRef}
            className="flex-grow overflow-y-auto px-10 py-10 space-y-8 scrollbar-hide"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-7 py-5 rounded-[32px] shadow-xl relative group ${
                      msg.sender === "user"
                        ? "bg-gradient-to-tr from-indigo-500 to-purple-600 text-white rounded-tr-none"
                        : "glass-card text-[var(--text-main)] rounded-tl-none border-white/5"
                    }`}
                  >
                    <p className="text-lg leading-relaxed font-medium italic">
                      {msg.text}
                    </p>
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-30 absolute -bottom-6 right-0 transition-opacity">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass-card px-6 py-4 rounded-[24px] flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input HUD */}
          <div className="p-8 border-t border-[var(--border-color)] bg-black/10 backdrop-blur-xl">
            <div className="relative flex items-center gap-4">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Share your thoughts anonymously..."
                className="flex-grow bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-[32px] py-6 px-8 text-[var(--text-main)] placeholder:text-[var(--text-muted)] outline-none focus:border-cyan-500/40 transition-all font-medium text-lg italic shadow-inner"
              />
              <motion.button
                whileHover={{ scale: 1.05, rotate: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-400 to-indigo-600 p-6 rounded-[30px] text-white shadow-xl hover:shadow-cyan-500/20 disabled:opacity-50"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth={3.5} />
                </svg>
              </motion.button>
            </div>

            {/* Disclaimer Bar */}
            <div className="mt-6 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)] opacity-50 text-center">
                This is not a medical diagnosis.
              </p>
              <div className="mt-2 flex gap-4">
                <span className="text-[8px] font-bold text-cyan-400/60 uppercase tracking-widest">
                  E2E Encrypted
                </span>
                <span className="text-[8px] font-bold text-pink-400/60 uppercase tracking-widest">
                  Zero Trace Log
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


export default TalkNow;
