import type { Board, Direction, Tile } from '../types';
import { GRID_SIZE } from '../constants';

let nextId = 1;

const createTile = (row: number, col: number, value: number): Tile => ({
  id: nextId++,
  value,
  row,
  col,
});

const getRandomEmptyCell = (board: Board): { row: number, col: number } | null => {
  const emptyCells = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (board[r][c] === null) {
        emptyCells.push({ row: r, col: c });
      }
    }
  }
  if (emptyCells.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

const addRandomTile = (board: Board): { board: Board, newTile: Tile | null } => {
  const newBoard = board.map(row => [...row]);
  const cell = getRandomEmptyCell(newBoard);
  if (cell) {
    const value = Math.random() < 0.9 ? 2 : 4;
    const newTile = createTile(cell.row, cell.col, value);
    newBoard[cell.row][cell.col] = newTile;
    return { board: newBoard, newTile };
  }
  return { board: newBoard, newTile: null };
};

export const initBoard = (): Board => {
  const emptyBoard: Board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
  const { board: board1 } = addRandomTile(emptyBoard);
  const { board: board2 } = addRandomTile(board1);
  return board2;
};

const cloneBoard = (board: Board): Board => board.map(row => row.map(tile => tile ? {...tile} : null));

const moveAndMerge = (line: (Tile | null)[]): { newLine: (Tile | null)[], score: number, mergedTiles: Tile[], moved: boolean } => {
  const filteredLine = line.filter(tile => tile !== null) as Tile[];
  const newLine: (Tile | null)[] = [];
  let score = 0;
  const mergedTiles: Tile[] = [];
  
  for (let i = 0; i < filteredLine.length; i++) {
    if (i + 1 < filteredLine.length && filteredLine[i].value === filteredLine[i+1].value) {
      const mergedValue = filteredLine[i].value * 2;
      const newTile = createTile(0, 0, mergedValue); // Temporary row/col
      newLine.push(newTile);
      mergedTiles.push(newTile);
      score += mergedValue;
      i++;
    } else {
      newLine.push(filteredLine[i]);
    }
  }

  while(newLine.length < GRID_SIZE) {
    newLine.push(null);
  }
  
  let moved = false;
  for (let i = 0; i < GRID_SIZE; i++) {
    if (line[i]?.value !== newLine[i]?.value) {
      moved = true;
      break;
    }
  }

  return { newLine, score, mergedTiles, moved };
};

const transpose = (board: Board): Board => {
  const newBoard: Board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      newBoard[c][r] = board[r][c];
    }
  }
  return newBoard;
};

export const move = (board: Board, direction: Direction): { board: Board, score: number, moved: boolean, newTile: Tile | null, mergedTiles: Tile[] } => {
  let tempBoard = cloneBoard(board);
  let totalScore = 0;
  let moved = false;
  let allMergedTiles: Tile[] = [];

  const updateTilePositions = (b: Board) => {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (b[r][c]) {
          b[r][c]!.row = r;
          b[r][c]!.col = c;
        }
      }
    }
  };

  const processBoard = (b: Board, reverse = false): Board => {
    const newBoard: Board = [];
    for (const row of b) {
      const lineToProcess = reverse ? [...row].reverse() : row;
      const { newLine, score, mergedTiles, moved: lineMoved } = moveAndMerge(lineToProcess);
      if (lineMoved) moved = true;
      const finalLine = reverse ? newLine.reverse() : newLine;
      newBoard.push(finalLine);
      totalScore += score;
      allMergedTiles.push(...mergedTiles);
    }
    return newBoard;
  };
  
  switch(direction) {
    case 'LEFT':
      tempBoard = processBoard(tempBoard);
      break;
    case 'RIGHT':
      tempBoard = processBoard(tempBoard, true);
      break;
    case 'UP':
      tempBoard = transpose(tempBoard);
      tempBoard = processBoard(tempBoard);
      tempBoard = transpose(tempBoard);
      break;
    case 'DOWN':
      tempBoard = transpose(tempBoard);
      tempBoard = processBoard(tempBoard, true);
      tempBoard = transpose(tempBoard);
      break;
  }
  
  updateTilePositions(tempBoard);
  allMergedTiles.forEach(merged => {
      const tileOnBoard = tempBoard[merged.row][merged.col];
      if(tileOnBoard) merged.id = tileOnBoard.id;
  });

  let newTile: Tile | null = null;
  if (moved) {
    const result = addRandomTile(tempBoard);
    tempBoard = result.board;
    newTile = result.newTile;
  }
  
  return { board: tempBoard, score: totalScore, moved, newTile, mergedTiles: allMergedTiles };
};

export const isGameOver = (board: Board): boolean => {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (board[r][c] === null) return false; // Empty cell exists
      if (r < GRID_SIZE - 1 && board[r][c]?.value === board[r + 1][c]?.value) return false; // Can merge down
      if (c < GRID_SIZE - 1 && board[r][c]?.value === board[r][c + 1]?.value) return false; // Can merge right
    }
  }
  return true;
};