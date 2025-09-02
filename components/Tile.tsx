import React, { memo } from 'react';

interface TileProps {
  value: number;
  row: number;
  col: number;
  isNew: boolean;
  isMerging: boolean;
}

const getTileStyle = (value: number): { background: string; text: string; text_size: string } => {
  switch (value) {
    case 2:    return { background: 'bg-neutral-200', text: 'text-neutral-900', text_size: 'text-5xl' };
    case 4:    return { background: 'bg-neutral-300', text: 'text-neutral-900', text_size: 'text-5xl' };
    case 8:    return { background: 'bg-sky-400',     text: 'text-white',        text_size: 'text-5xl' };
    case 16:   return { background: 'bg-sky-500',     text: 'text-white',        text_size: 'text-5xl' };
    case 32:   return { background: 'bg-indigo-400',  text: 'text-white',        text_size: 'text-5xl' };
    case 64:   return { background: 'bg-indigo-500',  text: 'text-white',        text_size: 'text-5xl' };
    case 128:  return { background: 'bg-purple-500',  text: 'text-white',        text_size: 'text-4xl' };
    case 256:  return { background: 'bg-purple-600',  text: 'text-white',        text_size: 'text-4xl' };
    case 512:  return { background: 'bg-pink-500',    text: 'text-white',        text_size: 'text-4xl' };
    case 1024: return { background: 'bg-yellow-400',  text: 'text-neutral-900',  text_size: 'text-3xl' };
    case 2048: return { background: 'bg-yellow-300',  text: 'text-neutral-900',  text_size: 'text-3xl' };
    default:   return { background: 'bg-red-500',     text: 'text-white',        text_size: 'text-3xl' };
  }
};


const Tile: React.FC<TileProps> = ({ value, row, col, isNew, isMerging }) => {
  const { background, text, text_size } = getTileStyle(value);

  const positionWrapperClasses = `absolute transition-all duration-200 ease-in-out`;
  
  const positionWrapperStyle = {
    width: 'var(--tile-size)',
    height: 'var(--tile-size)',
    top: `calc(var(--board-padding) + ${row} * (var(--tile-size) + var(--tile-gap)))`,
    left: `calc(var(--board-padding) + ${col} * (var(--tile-size) + var(--tile-gap)))`,
  } as React.CSSProperties;

  const animationClass = isNew ? 'animate-spawn' : isMerging ? 'animate-merge' : '';

  return (
    <div
      className={positionWrapperClasses}
      style={positionWrapperStyle}
    >
      <div
        className={`${background} w-full h-full rounded-md flex items-center justify-center font-bold ${animationClass}`}
      >
        <span className={`${text} ${text_size}`}>{value}</span>
      </div>
    </div>
  );
};

export default memo(Tile);