import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { WelcomeProps } from '../types';

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onStart(input);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-md flex flex-col items-center text-center space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      <div className="space-y-4">
        <motion.div 
          className="inline-block p-3 rounded-full bg-white/50 border border-gold-500/30 mb-4"
          animate={{ boxShadow: ["0 0 0px rgba(212, 175, 55, 0)", "0 0 20px rgba(212, 175, 55, 0.3)", "0 0 0px rgba(212, 175, 55, 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="text-gold-600 w-8 h-8" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-mystic-900 leading-tight">
          洞察<br/>
          <span className="text-gold-600">你的命运</span>
        </h1>
        <p className="text-mystic-600 font-light text-lg px-4 leading-relaxed">
          我是 一科 (YiKe)，您的 AI 心理塔罗师。
          <br />融合古老智慧与现代心理学，为您指引方向。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4 relative z-20">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-500 to-mystic-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="您心中有什么困惑？(例如：我和他的未来...)"
            className="relative w-full bg-white/90 backdrop-blur-sm border border-mystic-200 text-mystic-800 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all placeholder:text-mystic-400 font-sans text-lg"
          />
        </div>
        
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-full bg-mystic-900 text-mystic-50 py-4 rounded-xl font-serif tracking-widest hover:bg-mystic-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95"
        >
          <span>开始占卜</span>
          <ArrowRight size={18} />
        </button>
      </form>

      <div className="flex gap-4 text-xs text-mystic-400 pt-8 uppercase tracking-widest font-serif opacity-60">
        <span>Self-Discovery</span>
        <span>•</span>
        <span>Strategy</span>
        <span>•</span>
        <span>Destiny</span>
      </div>
    </motion.div>
  );
};

export default Welcome;