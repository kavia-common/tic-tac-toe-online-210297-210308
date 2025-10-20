import React from 'react';
import type { Player } from '../lib/types';

/**
 * PUBLIC_INTERFACE
 * StatusBar
 * Shows current game status: current turn, winner, or draw.
 */
export default function StatusBar(props: {
  current: Player;
  winner: Player | null;
  draw: boolean;
}) {
  if (props.winner) {
    return <div className="status"><span className="ok">Winner: {props.winner}</span></div>;
  }
  if (props.draw) {
    return <div className="status"><span className="warn">It’s a draw</span></div>;
  }
  return <div className="status">Current turn: <span className="ok">{props.current}</span></div>;
}
