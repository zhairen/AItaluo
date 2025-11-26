import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const CrystalBall: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 relative z-10">
      
      {/* Outer Glow Area */}
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        
        {/* Floor Reflection/Shadow */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/20 blur-xl rounded-[100%]" />

        {/* The Ball Container */}
        <motion.div 
          className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2),inset_0_-10px_20px_rgba(0,0,0,0.5),inset_0_10px_20px_rgba(255,255,255,0.5)] border border-white/20 backdrop-blur-sm bg-gradient-to-b from-indigo-300/10 to-purple-900/30"
          animate={{ 
            y: [0, -10, 0],
            boxShadow: [
                "0 0 50px rgba(167, 139, 250, 0.2), inset 0 -10px 20px rgba(0,0,0,0.5), inset 0 10px 20px rgba(255,255,255,0.4)", 
                "0 0 70px rgba(212, 175, 55, 0.4), inset 0 -10px 20px rgba(0,0,0,0.5), inset 0 10px 20px rgba(255,255,255,0.6)",
                "0 0 50px rgba(167, 139, 250, 0.2), inset 0 -10px 20px rgba(0,0,0,0.5), inset 0 10px 20px rgba(255,255,255,0.4)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Inner Fog/Mist Animation */}
          <motion.div 
            className="absolute inset-[-50%] w-[200%] h-[200%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 mix-blend-overlay"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div 
             className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-gold-400/10 to-blue-500/0"
             animate={{ opacity: [0.3, 0.7, 0.3] }}
             transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Central Light Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gold-200/40 rounded-full blur-2xl animate-pulse" />

          {/* Highlight Reflection */}
          <div className="absolute top-8 left-12 w-16 h-8 bg-white/40 blur-xl -rotate-45 rounded-full" />
        </motion.div>

        {/* Floating Sparkles around the ball */}
        <motion.div 
            className="absolute -top-4 -right-4 text-gold-400"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
            <Sparkles size={24} />
        </motion.div>
        <motion.div 
            className="absolute top-1/2 -left-8 text-mystic-400"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        >
            <Sparkles size={16} />
        </motion.div>
      </div>
      
      <div className="mt-12 text-center space-y-2">
        <h3 className="text-2xl font-serif text-mystic-900 animate-pulse">凝视命运水晶...</h3>
        <p className="text-mystic-600 font-light text-sm">一科 正在解读星象与潜意识的连接</p>
      </div>
    </div>
  );
};

export default CrystalBall;