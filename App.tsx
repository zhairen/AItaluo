import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, ArrowRight, History, Star } from 'lucide-react';
import { generateTarotReading } from './services/gemini';
import { DECK } from './constants';
import { TarotCard } from './types';
import Deck from './components/Deck';
import ReadingResult from './components/ReadingResult';
import Welcome from './components/Welcome';
import Header from './components/Header';

// Application states
type AppState = 'welcome' | 'shuffling' | 'picking' | 'revealing' | 'reading';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [question, setQuestion] = useState('');
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [reading, setReading] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize and shuffle deck
  useEffect(() => {
    shuffleDeck();
  }, []);

  const shuffleDeck = () => {
    const newDeck = [...DECK];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    setShuffledDeck(newDeck);
  };

  const handleStart = (userQuestion: string) => {
    setQuestion(userQuestion);
    setAppState('shuffling');
    // Simulate shuffling animation time
    setTimeout(() => {
      setAppState('picking');
    }, 2000);
  };

  const handleCardSelect = (card: TarotCard) => {
    if (selectedCards.length < 3) {
      const newSelection = [...selectedCards, card];
      setSelectedCards(newSelection);
      
      if (newSelection.length === 3) {
        // Immediately switch to reading state (which shows loading/Crystal Ball)
        setIsLoading(true);
        setAppState('reading');
        performReading(newSelection);
      }
    }
  };

  const performReading = async (cards: TarotCard[]) => {
    // isLoading is already set to true in handleCardSelect to prevent flicker
    
    // Create a minimum wait promise to ensure the Crystal Ball is visible for at least 3 seconds
    const minWait = new Promise(resolve => setTimeout(resolve, 3000));
    const readingPromise = generateTarotReading(question, cards);

    try {
      // Wait for both the minimum time and the API response
      const [_, result] = await Promise.all([minWait, readingPromise]);
      setReading(result);
    } catch (error) {
      console.error("Error generating reading:", error);
      setReading("抱歉，星象连接似乎中断了。请稍后再试。");
    } finally {
      setIsLoading(false);
      // appState is already 'reading'
    }
  };

  const resetApp = () => {
    setAppState('welcome');
    setQuestion('');
    setSelectedCards([]);
    setReading('');
    shuffleDeck();
  };

  // Helper to determine layout alignment
  const isCenteredState = appState === 'welcome' || appState === 'shuffling';

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-mystic-50 text-mystic-900 font-sans selection:bg-gold-500 selection:text-white">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-mystic-400/20 rounded-full blur-[100px]" />
      </div>

      <Header onReset={resetApp} />

      <main className={`
        flex-grow container mx-auto px-4 flex flex-col relative z-10 max-w-4xl
        ${isCenteredState ? 'items-center justify-center h-full' : 'items-center justify-start'}
      `}>
        <AnimatePresence mode="wait">
          
          {appState === 'welcome' && (
            <Welcome key="welcome" onStart={handleStart} />
          )}

          {appState === 'shuffling' && (
            <motion.div
              key="shuffling"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center flex flex-col items-center justify-center h-[60vh]"
            >
              <div className="relative w-32 h-48 mb-8">
                 {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 bg-gradient-to-br from-mystic-800 to-mystic-600 rounded-lg border-2 border-white/20 shadow-xl"
                      animate={{
                        rotate: [0, Math.random() * 10 - 5, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        y: [0, Math.random() * 20 - 10, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.1
                      }}
                    />
                 ))}
              </div>
              <h2 className="text-2xl font-serif text-mystic-800 animate-pulse">
                洗牌中...
              </h2>
              <p className="text-mystic-600 mt-2 font-light">
                正在连接您的潜意识能量...
              </p>
            </motion.div>
          )}

          {(appState === 'picking' || appState === 'revealing') && (
            <Deck 
              key="deck"
              cards={shuffledDeck}
              selectedCards={selectedCards}
              onCardSelect={handleCardSelect}
              isRevealing={appState === 'revealing'}
            />
          )}

          {appState === 'reading' && (
            <ReadingResult 
              key="result"
              question={question}
              cards={selectedCards}
              reading={reading}
              isLoading={isLoading}
              onReset={resetApp}
            />
          )}

        </AnimatePresence>
      </main>

      <footer className="py-6 text-center text-mystic-400 text-sm font-light relative z-20">
        <p>&copy; {new Date().getFullYear()} 一科塔罗 AI (YiKe Tarot). Guidance for the Soul.</p>
      </footer>
    </div>
  );
};

export default App;