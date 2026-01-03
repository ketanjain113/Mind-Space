import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-color)] py-12 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[var(--text-muted)] text-sm">
          &copy; {new Date().getFullYear()} MindSpace Campus. Built for students, by students.
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-indigo)] transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-indigo)] transition-colors">Safety Disclaimer</a>
          <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-indigo)] transition-colors">Campus Resources</a>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-8 text-center text-[11px] text-[var(--text-muted)] leading-relaxed uppercase tracking-widest">
        This platform is for emotional support only. In case of emergency, please dial 911 or visit the nearest hospital.
      </div>
    </footer>
  );
};

export default Footer;