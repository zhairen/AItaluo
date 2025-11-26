import React from 'react';
import { motion } from 'framer-motion';
import { DeckProps, TarotCard } from '../types';

const Deck: React.FC<DeckProps> = ({ cards, selectedCards, onCardSelect, isRevealing }) => {
  const isSelected = (card: TarotCard) => selectedCards.some(c => c.id === card.id);

  return (
    <motion.div 
      className="w-full max-w-5xl flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-6 text-center space-y-2 sticky top-0 z-30 py-2 w-full bg-gradient-to-b from-mystic-50 via-mystic-50 to-transparent">
        <h3 className="text-xl font-serif text-mystic-800">
          {isRevealing ? "牌阵已生成" : "请凭直觉抽取 3 张牌"}
        </h3>
        <div className="flex justify-center gap-2">
           {/* Progress Indicators */}
           {[0, 1, 2].map(i => (
             <div 
                key={i} 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedCards.length > i ? 'bg-gold-500 scale-110' : 'bg-mystic-200'}`}
             />
           ))}
        </div>
      </div>

      {/* 
        Grid layout optimized for mobile (scrolling) and desktop (fan simulation visually via grid).
        We display a subset of 'cards' to avoid rendering DOM for 78 items heavily, 
        but conceptually the user is picking from the 'deck'. 
        To make it manageable, we show the whole deck as a tight grid.
      */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-13 gap-1 sm:gap-2 pb-20 w-full px-2">
        {cards.map((card, index) => {
          const selectedInfo = selectedCards.find(c => c.id === card.id);
          const isPicked = !!selectedInfo;
          
          return (
            <motion.div
              key={card.id}
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: isRevealing && !isPicked ? 0.1 : 1, // Fade out unpicked cards
                y: isPicked ? -20 : 0,
                zIndex: isPicked ? 50 : 0
              }}
              transition={{ delay: index * 0.01 }}
              whileHover={!isRevealing && !isPicked ? { y: -10, zIndex: 10 } : {}}
              onClick={() => !isRevealing && !isPicked && onCardSelect(card)}
              className={`
                aspect-[2/3] rounded-md cursor-pointer relative transition-shadow duration-300
                ${isPicked ? 'ring-2 ring-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'hover:shadow-lg'}
                ${selectedCards.length >= 3 && !isPicked ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              {/* Card Back Design */}
              <div className="w-full h-full bg-gradient-to-br from-mystic-800 to-mystic-700 rounded-md border border-mystic-600 flex items-center justify-center overflow-hidden">
                <div className="w-[80%] h-[80%] border border-mystic-500/30 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 rotate-45 bg-mystic-500/50"></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Deck;