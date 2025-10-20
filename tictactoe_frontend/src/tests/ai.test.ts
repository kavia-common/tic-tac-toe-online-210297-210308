import { describe, it, expect } from 'vitest';
import { chooseAIMove } from '../lib/ai';
import { createEmptyBoard, makeMove } from '../lib/gameLogic';
import type { Board } from '../lib/types';

describe('AI', () => {
  it('chooses a valid move on empty board', () => {
    const b = createEmptyBoard();
    const idx = chooseAIMove(b, 'O');
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(idx).toBeLessThan(9);
  });

  it('blocks immediate opponent winning move', () => {
    // X is human, O is AI
    let b: Board = createEmptyBoard();
    b = makeMove(b, 0, 'X').board;
    b = makeMove(b, 4, 'O').board;
    b = makeMove(b, 1, 'X').board;
    // X threatens to win at 2
    const aiIdx = chooseAIMove(b, 'O');
    expect(aiIdx).toBe(2);
  });

  it('throws when board invalid or finished', () => {
    const b = Array(9).fill('Z') as unknown as Board;
    expect(() => chooseAIMove(b, 'O')).toThrow();
    const c: Board = ['X','X','X',null,null,null,null,null,null];
    expect(() => chooseAIMove(c, 'O')).toThrow();
  });
});
