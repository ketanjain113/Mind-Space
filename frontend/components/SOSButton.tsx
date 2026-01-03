
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SOSButton: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsOpen(true)}
      className="fixed bottom-8 right-8 z-[55] w-20 h-20 bg-gradient-to-br from-[#ff0844] to-[#ffb199] rounded-[24px] flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(255,8,68,0.4)] group border border-white/20"
    >
        <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-white rounded-[24px]"
        />
        <div className="relative flex flex-col items-center text-white">
            <span className="text-[12px] font-black tracking-tighter mb-0.5">SOS</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
        </div>
    </motion.button>
  );
};

export default SOSButton;
