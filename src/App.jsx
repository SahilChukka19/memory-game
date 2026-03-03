import { AnimatePresence } from 'framer-motion';
import GameHeader from './components/GameHeader';
import Board from './components/Board';
import WinModal from './components/WinModal';
import { useGameLogic } from './hooks/useGameLogic';

export default function App() {
  const {
    cards,
    flipped,
    matched,
    moves,
    timeDisplay,
    isWon,
    flipCard,
    restart,
  } = useGameLogic();

  return (
    <div className="app">
      <GameHeader
        moves={moves}
        timeDisplay={timeDisplay}
        onRestart={restart}
      />

      <Board
        cards={cards}
        flipped={flipped}
        matched={matched}
        onCardClick={flipCard}
      />

      <AnimatePresence>
        {isWon && (
          <WinModal
            moves={moves}
            timeDisplay={timeDisplay}
            onPlayAgain={restart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
