import React from 'react';
import type { Player } from '../lib/types';
import ChessIcon from './ChessIcon';

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
  const renderIcon = (p: Player) => (
    <span aria-hidden="true" style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
      <ChessIcon player={p} size={22} ariaLabel={p === 'X' ? 'Knight' : 'Queen'} />
    </span>
  );

  if (props.winner) {
    return (
      <div className="status" aria-live="polite">
        <span className="ok" aria-label={`Winner: ${props.winner === 'X' ? 'Knight' : 'Queen'}`}>
          Winner: {renderIcon(props.winner)}{' '}
          <span style={{ marginLeft: 6 }}>{props.winner === 'X' ? 'Knight' : 'Queen'}</span>
        </span>
      </div>
    );
  }
  if (props.draw) {
    return (
      <div className="status" aria-live="polite">
        <span className="warn">It’s a draw</span>
      </div>
    );
  }
  return (
    <div className="status" aria-live="polite">
      Current turn:{' '}
      <span className="ok" aria-label={`Current: ${props.current === 'X' ? 'Knight' : 'Queen'}`}>
        {renderIcon(props.current)}
        <span style={{ marginLeft: 6 }}>{props.current === 'X' ? 'Knight' : 'Queen'}</span>
      </span>
    </div>
  );
}
