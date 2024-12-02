export const CELL_SIZE = 30;
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export type Board = number[][];
export interface GamePiece {
    type: number;
    shape: number[][];
    pos: { x: number; y: number };
    rotation: number;
}

import { SHAPES } from './tetrominos';
import { playSound } from './sounds';

export interface Piece {
  x: number;
  y: number;
  shape: number[][];
  type: number;
  rotation: number;
}

export interface GameState {
  board: number[][];
  currentPiece: Piece | null;
  score: number;
  level: number;
  lines: number;
  language: 'en' | 'ru';
  soundEnabled: boolean;
  gameOver: boolean;
}

export function initGame(): GameState {
  return {
    board: Array(20).fill(null).map(() => Array(10).fill(0)),
    currentPiece: getRandomPiece(),
    score: 0,
    level: 1,
    lines: 0,
    language: 'en',
    soundEnabled: true,
    gameOver: false,
  };
}

export function getRandomPiece(): Piece {
  const type = Math.floor(Math.random() * SHAPES.length);
  return {
    x: 3,
    y: 0,
    shape: SHAPES[type],
    type,
    rotation: 0,
  };
}

export function checkCollision(
  board: number[][],
  piece: Piece,
  offsetX = 0,
  offsetY = 0
): boolean {
  return piece.shape.some((row, dy) =>
    row.some((value, dx) => {
      if (!value) return false;
      const newX = piece.x + dx + offsetX;
      const newY = piece.y + dy + offsetY;
      return (
        newX < 0 ||
        newX >= 10 ||
        newY >= 20 ||
        (newY >= 0 && board[newY][newX])
      );
    })
  );
}

export function mergePiece(board: number[][], piece: Piece): number[][] {
  const newBoard = board.map(row => [...row]);
  piece.shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value) {
        const newY = piece.y + dy;
        if (newY >= 0) {
          newBoard[newY][piece.x + dx] = piece.type + 1;
        }
      }
    });
  });
  return newBoard;
}

export function clearLines(state: GameState): GameState {
  const newBoard = state.board.filter(row => row.some(cell => !cell));
  const linesCleared = state.board.length - newBoard.length;
  
  if (linesCleared === 0) return state;

  const points = [0, 1, 3, 5, 8][linesCleared] || 0;
  const newLines = state.lines + linesCleared;
  const newLevel = Math.floor(newLines / 15) + 1;

  while (newBoard.length < 20) {
    newBoard.unshift(Array(10).fill(0));
  }

  if (state.soundEnabled) {
    playSound(linesCleared);
  }

  return {
    ...state,
    board: newBoard,
    score: state.score + points * state.level,
    lines: newLines,
    level: newLevel,
  };
}

export function moveDown(state: GameState): GameState {
  if (!state.currentPiece || state.gameOver) return state;

  if (!checkCollision(state.board, state.currentPiece, 0, 1)) {
    return {
      ...state,
      currentPiece: {
        ...state.currentPiece,
        y: state.currentPiece.y + 1,
      },
    };
  }

  const newBoard = mergePiece(state.board, state.currentPiece);
  const newPiece = getRandomPiece();
  const gameOver = checkCollision(newBoard, newPiece);

  return clearLines({
    ...state,
    board: newBoard,
    currentPiece: gameOver ? null : newPiece,
    gameOver,
  });
}
