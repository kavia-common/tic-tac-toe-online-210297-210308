import React from 'react';
import type { GameMode } from '../lib/types';

/**
 * PUBLIC_INTERFACE
 * ModeSelector
 * Dropdown to choose between Player vs Player (PVP) and Player vs Computer (PVC).
 */
export function ModeSelector(props: {
  mode: GameMode;
  onChange: (m: GameMode) => void;
}) {
  return (
    <select
      aria-label="Select game mode"
      className="select"
      value={props.mode}
      onChange={(e) => props.onChange((e.target.value as GameMode) ?? 'PVP')}
    >
      <option value="PVP">Player vs Player</option>
      <option value="PVC">Player vs Computer</option>
    </select>
  );
}

export default ModeSelector;
