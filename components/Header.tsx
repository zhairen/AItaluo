import React from 'react';
import { Star, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="w-full p-4 flex justify-between items-center z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onReset}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-amber-700 flex items-center justify-center text-white shadow-lg">
          <Star size={16} fill="currentColor" />
        </div>
        <span className="font-serif text-xl font-bold tracking-widest text-mystic-900">一科.AI</span>
      </div>
      <button 
        onClick={onReset}
        className="p-2 rounded-full hover:bg-mystic-200 transition-colors text-mystic-600"
        aria-label="Reset"
      >
        <RefreshCw size={20} />
      </button>
    </header>
  );
};

export default Header;