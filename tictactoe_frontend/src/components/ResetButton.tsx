import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ResetButton
 * Resets the game to the initial state.
 */
export default function ResetButton(props: { onReset: () => void }) {
  return (
    <button className="button secondary" onClick={props.onReset} aria-label="Reset game">
      Reset
    </button>
  );
}
