import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

interface CardItem {
  id: number;
  pairId: number;
  type: 'word' | 'emoji';
  content: string;
  nameAr: string;
  flipped: boolean;
  matched: boolean;
}

export const SoundMemoryGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();

  const pairs = [
    { id: 1, word: 'بَطَّة', emoji: '🦆' },
    { id: 2, word: 'بَاب', emoji: '🚪' },
    { id: 3, word: 'بَيْت', emoji: '🏠' },
    { id: 4, word: 'بَحْر', emoji: '🌊' }
  ];

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  const initGame = () => {
    const deck: CardItem[] = [];
    let counter = 0;
    pairs.forEach(p => {
      deck.push({ id: counter++, pairId: p.id, type: 'word', content: p.word, nameAr: p.word, flipped: false, matched: false });
      deck.push({ id: counter++, pairId: p.id, type: 'emoji', content: p.emoji, nameAr: p.word, flipped: false, matched: false });
    });
    setCards(deck.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (cards[index].flipped || cards[index].matched || flippedCards.length === 2) return;

    soundManager.playPop();
    const newCards = [...cards];
    newCards[index].flipped = true;
    soundManager.speak(cards[index].nameAr);
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const first = newCards[newFlipped[0]];
      const second = newCards[newFlipped[1]];

      if (first.pairId === second.pairId) {
        // Matched!
        soundManager.playSuccess();
        setTimeout(() => {
          first.matched = true;
          second.matched = true;
          setCards([...newCards]);
          setFlippedCards([]);

          // Check if all matched
          if (newCards.every(c => c.matched)) {
            setCompleted(true);
            triggerCelebration();
            addStars(3);
            addCoins(15);
          }
        }, 500);
      } else {
        // Not matched
        soundManager.playEncouragement();
        setTimeout(() => {
          first.flipped = false;
          second.flipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6">
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-teal-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎴</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ ذَاكِرَةِ الأَصْوَات</h2>
            <p className="text-xs text-slate-500 font-bold">
              طَابِقْ بَيْنَ الكَلِمَةِ وَالصُّورَةِ المُنَاسِبَةِ لَهَا!
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-gradient-to-b from-teal-100 to-sky-50 p-6 md:p-8 rounded-3xl border-4 border-white shadow-card-pop text-center space-y-6">
        {!completed ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`w-full h-28 md:h-32 rounded-3xl font-black text-2xl md:text-3xl border-4 flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-md ${
                  card.flipped || card.matched
                    ? 'bg-white border-teal-400 text-teal-800 rotate-0'
                    : 'bg-gradient-to-tr from-teal-500 to-sky-400 border-white text-white rotate-1'
                }`}
              >
                {card.flipped || card.matched ? (
                  <span className="animate-pop">{card.content}</span>
                ) : (
                  <span className="text-3xl">❓</span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="py-6 space-y-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl font-black text-slate-800">
              ذَاكِرَةٌ قَوِيَّةٌ جِدًّا يَا بَطَل!
            </h3>
            <button
              onClick={initGame}
              className="game-btn px-6 py-3 bg-teal-500 text-white rounded-2xl font-black text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>الْعَبْ ثَانِيَةً 🎴</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
