import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ReadingResultProps } from '../types';
import ReactMarkdown from 'react-markdown';
import CrystalBall from './CrystalBall';

const ReadingResult: React.FC<ReadingResultProps> = ({ question, cards, reading, isLoading, onReset }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && containerRef.current) {
        // Scroll to the top of the container (showing images first)
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLoading, reading]);

  if (isLoading) {
    return <CrystalBall />;
  }

  return (
    <div ref={containerRef} className="w-full max-w-5xl pb-12 pt-16 md:pt-24">
      {/* Selected Cards Display with Rich Imagery */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 mb-12 px-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-center gap-4 w-full max-w-[260px]"
          >
             <div className="relative w-full aspect-[1/1.65] group">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-gold-500 via-transparent to-gold-500 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Actual Card Image */}
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden border-[8px] border-double border-gold-600 bg-mystic-900">
                   {card.image ? (
                     <img 
                       src={card.image} 
                       alt={card.nameCN} 
                       className="w-full h-full object-cover"
                       onError={(e) => {
                         // Fallback if image fails
                         e.currentTarget.style.display = 'none';
                         e.currentTarget.nextElementSibling?.classList.remove('hidden');
                       }}
                     />
                   ) : null}
                   
                   {/* Fallback for broken/missing image */}
                   <div className={`hidden absolute inset-0 bg-mystic-800 flex flex-col items-center justify-center text-center p-4 ${!card.image ? 'block' : ''}`}>
                      <div className="w-16 h-16 rounded-full border-2 border-gold-500 flex items-center justify-center mb-2">
                         <span className="text-2xl text-gold-500">?</span>
                      </div>
                      <span className="text-gold-200 font-serif font-bold text-lg">{card.nameCN}</span>
                   </div>
                   
                   {/* Gradient Overlay for Text Readability at bottom */}
                   <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                </div>
                
                {/* Position Badge */}
                <div className="absolute -top-3 -right-3 bg-mystic-900 border border-gold-500 text-gold-500 w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold shadow-lg z-20">
                    {index + 1}
                </div>
             </div>

             <div className="text-center space-y-1 relative z-10">
                 <p className="text-xs font-serif uppercase tracking-[0.2em] text-gold-600 font-bold">
                    {index === 0 ? "Situation" : index === 1 ? "Action" : "Outcome"}
                 </p>
                 <h4 className="font-serif text-xl font-bold text-mystic-900">{card.nameCN}</h4>
                 <p className="text-sm text-mystic-500 font-light italic">{card.name}</p>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Reading Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 md:p-12 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.1)] border border-white/60 max-w-4xl mx-auto"
      >
        <div className="mb-10 border-b-2 border-mystic-100/80 pb-8 text-center">
            <div className="inline-block p-2 px-4 rounded-full bg-mystic-50 border border-mystic-100 mb-4">
                <p className="text-xs font-bold text-gold-600 uppercase tracking-widest">Your Inquiry</p>
            </div>
            <p className="text-2xl md:text-3xl font-serif text-mystic-900 leading-relaxed italic">"{question}"</p>
        </div>

        <div className="prose prose-stone prose-lg prose-headings:font-serif prose-headings:text-mystic-900 prose-headings:font-normal prose-p:text-mystic-700 prose-strong:text-mystic-900 prose-strong:font-bold prose-li:text-mystic-700 max-w-none">
            <ReactMarkdown>{reading}</ReactMarkdown>
        </div>

        <div className="mt-16 flex justify-center">
            <button 
                onClick={onReset}
                className="group relative px-10 py-4 bg-mystic-900 text-white font-serif tracking-wider rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center gap-3">
                  <span className="text-lg">✦</span> 开始新的占卜
                </span>
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ReadingResult;