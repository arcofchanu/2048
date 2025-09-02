import { useState, useEffect, useCallback } from 'react';
import type { Board, Direction, Tile } from '../types';
import { GRID_SIZE } from '../constants';
import { initBoard, move, isGameOver } from '../lib/gameLogic';

export const useGame = () => {
  const [board, setBoard] = useState<Board>(initBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('bestScore2048') || '0', 10);
  });
  const [isGameOverState, setIsGameOverState] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number, y: number } | null>(null);
  const [newTiles, setNewTiles] = useState<Tile[]>([]);
  const [mergedTiles, setMergedTiles] = useState<Tile[]>([]);
  const [showScoreMilestone, setShowScoreMilestone] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('bestScore2048', score.toString());
    }
  }, [score, bestScore]);

  const restartGame = useCallback(() => {
    setBoard(initBoard());
    setScore(0);
    setIsGameOverState(false);
    setNewTiles([]);
    setMergedTiles([]);
    setConfettiTrigger(0);
  }, []);

  const handleMove = useCallback((direction: Direction) => {
    if (isGameOverState) return;

    const { board: newBoard, score: moveScore, moved, newTile, mergedTiles: newMergedTiles } = move(board, direction);

    if (moved) {
      setBoard(newBoard);
      setScore(prev => {
        const newScore = prev + moveScore;
        if (Math.floor(prev / 100) < Math.floor(newScore / 100)) {
          setShowScoreMilestone(true);
          setTimeout(() => setShowScoreMilestone(false), 500); // Animation duration
        }
        if (Math.floor(prev / 500) < Math.floor(newScore / 500)) {
            setConfettiTrigger(c => c + 1);
        }
        return newScore;
      });
      setNewTiles(newTile ? [newTile] : []);
      setMergedTiles(newMergedTiles);

      if (isGameOver(newBoard)) {
        setIsGameOverState(true);
      }
    } else {
        setNewTiles([]);
        setMergedTiles([]);
    }
  }, [board, isGameOverState]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
      case 'ArrowUp':
        handleMove('UP');
        break;
      case 'ArrowDown':
        handleMove('DOWN');
        break;
      case 'ArrowLeft':
        handleMove('LEFT');
        break;
      case 'ArrowRight':
        handleMove('RIGHT');
        break;
    }
  }, [handleMove]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dx = touchEnd.x - touchStart.x;
    const dy = touchEnd.y - touchStart.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 30) { // Swipe threshold
      if (absDx > absDy) {
        handleMove(dx > 0 ? 'RIGHT' : 'LEFT');
      } else {
        handleMove(dy > 0 ? 'DOWN' : 'UP');
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return {
    board,
    score,
    bestScore,
    isGameOver: isGameOverState,
    newTiles,
    mergedTiles,
    restartGame,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    showScoreMilestone,
    confettiTrigger,
  };
};