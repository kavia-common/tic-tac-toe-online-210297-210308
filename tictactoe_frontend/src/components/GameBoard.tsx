import React, { useEffect, useMemo, useState } from 'react';
import { createEmptyBoard, getNextPlayer, makeMove, calculateWinner, isDraw } from '../lib/gameLogic';
import { chooseAIMove } from '../lib/ai';
import type { Board, GameMode, Player } from '../lib/types';
import { logEvent } from '../lib/audit';
import ModeSelector from './ModeSelector';
import StatusBar from './StatusBar';
import ResetButton from './ResetButton';
import ChessIcon from './ChessIcon';

/**
 * PUBLIC_INTERFACE
 * GameBoard
 * Main interactive game component managing board state and interactions.
 */
export default function GameBoard() {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [mode, setMode] = useState<GameMode>('PVP');
  const currentPlayer = useMemo<Player>(() => getNextPlayer(board), [board]);
  const winner = useMemo(() => calculateWinner(board), [board]);
  const draw = useMemo(() => isDraw(board), [board]);
  const isFinished = Boolean(winner) || draw;

  // Effect: If mode PVC and it's computer's turn, compute AI move
  useEffect(() => {
    if (mode !== 'PVC' || isFinished) return;
    const aiPlayer: Player = 'O'; // by convention, AI plays O
    if (currentPlayer !== aiPlayer) return;

    // Small delay for UX
    const t = setTimeout(() => {
      try {
        const idx = chooseAIMove(board, aiPlayer);
        const before = board;
        const res = makeMove(board, idx, aiPlayer);
        if (res.valid) {
          setBoard(res.board);
          logEvent({
            userId: 'ai',
            action: 'UPDATE',
            type: 'AI_MOVE',
            before,
            after: res.board,
            details: { index: idx, player: aiPlayer }
          });
        } else {
          logEvent({
            userId: 'ai',
            action: 'SYSTEM',
            type: 'ERROR',
            reason: res.error || 'Unknown',
            before,
            after: res.board
          });
        }
      } catch (e) {
        logEvent({
          userId: 'ai',
          action: 'SYSTEM',
          type: 'ERROR',
          reason: e instanceof Error ? e.message : 'AI error',
          before: board
        });
      }
    }, 350);
    return () => clearTimeout(t);
  }, [board, currentPlayer, isFinished, mode]);

  function onCellClick(index: number) {
    if (isFinished) return;
    if (board[index] !== null) {
      logEvent({
        type: 'ERROR',
        action: 'SYSTEM',
        reason: 'Cell already occupied',
        details: { index }
      });
      return;
    }
    const before = board;
    const res = makeMove(board, index, currentPlayer);
    if (!res.valid) {
      logEvent({
        type: 'ERROR',
        action: 'SYSTEM',
        reason: res.error || 'Invalid move',
        before
      });
      return;
    }
    setBoard(res.board);
    logEvent({
      action: 'UPDATE',
      type: 'MOVE',
      before,
      after: res.board,
      details: { index, player: currentPlayer }
    });
  }

  function handleReset() {
    const before = board;
    const next = createEmptyBoard();
    setBoard(next);
    logEvent({
      action: 'DELETE',
      type: 'RESET',
      before,
      after: next,
      reason: 'User requested reset'
    });
  }

  function handleModeChange(m: GameMode) {
    const before = { mode };
    setMode(m);
    // Reset board on mode change for simplicity and fairness
    const oldBoard = board;
    const next = createEmptyBoard();
    setBoard(next);
    logEvent({
      action: 'UPDATE',
      type: 'MODE_CHANGE',
      before: { ...before, board: oldBoard },
      after: { mode: m, board: next }
    });
  }

  return (
    <div className="container">
      <header className="header">
        <div className="title">
          Tic Tac Toe
          <span className="badge">Ocean Professional</span>
        </div>
        <ModeSelector mode={mode} onChange={handleModeChange} />
      </header>

      <section className="card" aria-label="Tic Tac Toe game board">
        <div className="grid" role="grid">
          {board.map((val, i) => {
            const cls = val === 'X' ? 'cell cell-x' : val === 'O' ? 'cell cell-o' : 'cell';
            const aria = val === 'X'
              ? `Cell ${i + 1}: Knight`
              : val === 'O'
              ? `Cell ${i + 1}: Queen`
              : `Cell ${i + 1}: Empty`;
            return (
              <button
                key={i}
                role="gridcell"
                aria-label={aria}
                className={isFinished ? `${cls} disabled` : cls}
                onClick={() => onCellClick(i)}
                disabled={isFinished}
              >
                {val ? <ChessIcon player={val} size={40} /> : null}
              </button>
            );
          })}
        </div>

        <div className="controls">
          <ResetButton onReset={handleReset} />
        </div>

        <StatusBar current={currentPlayer} winner={winner} draw={draw} />
        <div className="footer-note">PvP and Vs Computer supported. Actions are locally audited.</div>
      </section>
    </div>
  );
}
