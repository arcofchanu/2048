import React from 'react';
import Button from './Button';

interface HeaderProps {
  score: number;
  bestScore: number;
  onRestart: () => void;
  showScoreMilestone: boolean;
}

const ScoreBox: React.FC<{ title: string; score: number; isMilestone?: boolean }> = ({ title, score, isMilestone }) => (
  <div className={`bg-neutral-950 rounded-md p-3 text-center min-w-[100px] ${isMilestone ? 'animate-score-milestone' : ''}`}>
    <div className="text-sm text-neutral-400 uppercase">{title}</div>
    <div className="text-2xl text-white">{score}</div>
  </div>
);

const Header: React.FC<HeaderProps> = ({ score, bestScore, onRestart, showScoreMilestone }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-6xl md:text-7xl text-neutral-100 text-glow">2048</h1>
      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start sm:space-x-2">
        <div className="flex items-center space-x-2">
            <ScoreBox title="Score" score={score} isMilestone={showScoreMilestone} />
            <ScoreBox title="Best" score={bestScore} />
        </div>
        <Button onClick={onRestart}>New Game</Button>
      </div>
    </div>
  );
};

export default Header;
