import React, { useMemo } from 'react';
import type { Board, Tile } from '../types';
import { GRID_SIZE } from '../constants';
import GameTile from './Tile';

interface BoardProps {
  board: Board;
  newTiles: Tile[];
  mergedTiles: Tile[];
}

const BoardComponent: React.FC<BoardProps> = ({ board, newTiles, mergedTiles }) => {
  const allTiles = board.flat().filter(tile => tile !== null) as Tile[];
  
  const newTileIds = useMemo(() => new Set(newTiles.map(t => t.id)), [newTiles]);
  const mergedTileIds = useMemo(() => new Set(mergedTiles.map(t => t.id)), [mergedTiles]);

  const boardStyle = {
    '--grid-size': GRID_SIZE,
    '--board-padding': '0.75rem', // Corresponds to p-3
    '--tile-gap': '0.75rem',      // Corresponds to gap-3
    '--tile-size': `calc((100% - 2 * var(--board-padding) - (var(--grid-size) - 1) * var(--tile-gap)) / var(--grid-size))`,
  } as React.CSSProperties;

  return (
    <div 
      className="bg-neutral-950 rounded-xl p-[var(--board-padding)] aspect-square relative border border-neutral-700 shadow-[0_0_15px_rgba(124,58,237,0.3),_inset_0_0_4px_rgba(255,255,255,0.1)]"
      style={boardStyle}
    >
      {/* Background Grid Layer */}
      <div className="grid grid-cols-4 grid-rows-4 gap-[var(--tile-gap)] w-full h-full">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
          <div key={i} className="bg-neutral-800 rounded-md" />
        ))}
      </div>
      
      {/* Tiles Layer */}
      <div className="absolute inset-0">
        {allTiles.map(tile => (
          <GameTile 
            key={tile.id} 
            value={tile.value}
            row={tile.row}
            col={tile.col}
            isNew={newTileIds.has(tile.id)}
            isMerging={mergedTileIds.has(tile.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;