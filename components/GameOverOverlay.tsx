import React from 'react';
import Button from './Button';

interface GameOverOverlayProps {
  score: number;
  onRestart: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center rounded-lg animate-spawn">
      <h2 className="text-6xl md:text-7xl text-white mb-4">Game Over</h2>
      <p className="text-lg text-neutral-300 mb-6">Your score: {score}</p>
      <Button onClick={onRestart} large>
        Try Again
      </Button>
    </div>
  );
};

export default GameOverOverlay;