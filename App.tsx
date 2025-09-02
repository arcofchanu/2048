import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import Board from './components/Board';
import Header from './components/Header';
import GameOverOverlay from './components/GameOverOverlay';
import LiveBackground from './components/LiveBackground';
import StartPage from './components/StartPage';
import ScoreMilestoneEffect from './components/ScoreMilestoneEffect';

const App: React.FC = () => {
  const { board, score, bestScore, isGameOver, newTiles, mergedTiles, restartGame, handleTouchStart, handleTouchMove, handleTouchEnd, showScoreMilestone, confettiTrigger } = useGame();
  const [isGameActive, setGameActive] = useState(false);

  const handleStartGame = () => {
    restartGame();
    setGameActive(true);
  };

  return (
    <div className="relative w-screen min-h-screen bg-neutral-900 overflow-hidden">
      <LiveBackground />
      <ScoreMilestoneEffect trigger={confettiTrigger} />
      <div
        className="absolute inset-0 z-10 text-white flex flex-col items-center justify-center p-4 select-none"
      >
        {!isGameActive ? (
          <StartPage onStart={handleStartGame} />
        ) : (
          <main 
            className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Header score={score} bestScore={bestScore} onRestart={restartGame} showScoreMilestone={showScoreMilestone} />
            <div className="relative mt-8">
              <Board board={board} newTiles={newTiles} mergedTiles={mergedTiles} />
              {isGameOver && <GameOverOverlay score={score} onRestart={restartGame} />}
            </div>
            <footer className="text-center text-neutral-500 mt-8">
              <p>Join the numbers and get to the 2048 tile!</p>
              <p>Use your arrow keys or swipe to move the tiles.</p>
            </footer>
          </main>
        )}
      </div>
    </div>
  );
};

export default App;