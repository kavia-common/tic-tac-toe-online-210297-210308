import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  validateBoard,
  getNextPlayer,
  calculateWinner,
  isDraw,
  makeMove,
  LINES
} from '../lib/gameLogic';
import type { Board } from '../lib/types';

describe('gameLogic', () => {
  it('createEmptyBoard should return 9 nulls', () => {
    const b = createEmptyBoard();
    expect(b.length).toBe(9);
    expect(b.every(v => v === null)).toBe(true);
  });

  it('validateBoard should detect valid and invalid boards', () => {
    const b = createEmptyBoard();
    expect(validateBoard(b)).toBe(true);
    // @ts-expect-error Intentionally passing wrong type to test validator rejects non-Board arrays
    expect(validateBoard([])).toBe(false);
    const bad = Array(9).fill('Z');
    // @ts-expect-error Intentionally wrong cell values to test validator
    expect(validateBoard(bad)).toBe(false);
  });

  it('getNextPlayer should start with X and alternate', () => {
    const b = createEmptyBoard();
    expect(getNextPlayer(b)).toBe('X');
    const b2: Board = [...b];
    b2[0] = 'X';
    expect(getNextPlayer(b2)).toBe('O');
  });

  it('calculateWinner detects wins across all lines', () => {
    for (const line of LINES) {
      const b = createEmptyBoard();
      b[line[0]] = 'X';
      b[line[1]] = 'X';
      b[line[2]] = 'X';
      expect(calculateWinner(b)).toBe('X');
    }
  });

  it('isDraw detects draw when full with no winner', () => {
    const b: Board = ['X','O','X','X','O','O','O','X','X'];
    expect(isDraw(b)).toBe(true);
  });

  it('makeMove should validate index and occupancy', () => {
    const b = createEmptyBoard();
    expect(makeMove(b, -1, 'X').valid).toBe(false);
    expect(makeMove(b, 9, 'X').valid).toBe(false);
    const first = makeMove(b, 0, 'X');
    expect(first.valid).toBe(true);
    const dup = makeMove(first.board, 0, 'O');
    expect(dup.valid).toBe(false);
  });

  it('makeMove detects winner and draw', () => {
    let b: Board = createEmptyBoard();
    // X moves
    b = makeMove(b, 0, 'X').board;
    b = makeMove(b, 3, 'O').board;
    b = makeMove(b, 1, 'X').board;
    b = makeMove(b, 4, 'O').board;
    const res = makeMove(b, 2, 'X');
    expect(res.winner).toBe('X');
    expect(res.isDraw).toBe(false);
  });
});
