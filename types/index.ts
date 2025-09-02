
export type Tile = {
  id: number;
  value: number;
  row: number;
  col: number;
};

export type Board = (Tile | null)[][];

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
