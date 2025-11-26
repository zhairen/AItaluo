export interface TarotCard {
  id: string;
  name: string;
  nameCN: string;
  arcana: 'Major' | 'Minor';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  number?: number | string;
  meaningKeywords: string[];
  image: string; // URL to the card image
}

export interface DeckProps {
  cards: TarotCard[];
  selectedCards: TarotCard[];
  onCardSelect: (card: TarotCard) => void;
  isRevealing: boolean;
}

export interface WelcomeProps {
  onStart: (question: string) => void;
}

export interface ReadingResultProps {
  question: string;
  cards: TarotCard[];
  reading: string;
  isLoading: boolean;
  onReset: () => void;
}