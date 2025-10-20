import React from 'react';
import type { Player } from '../lib/types';

/**
 * PUBLIC_INTERFACE
 * ChessIcon
 * Renders a themed, accessible chess icon: Knight for 'X' and Queen for 'O'.
 *
 * Props:
 * - player: 'X' | 'O' (determines which icon to render)
 * - size?: number (pixel size; defaults to 36)
 * - ariaLabel?: string (optional override for accessibility label)
 */
export default function ChessIcon(props: { player: Player; size?: number; ariaLabel?: string }) {
  const { player, size = 36, ariaLabel } = props;
  const label = ariaLabel ?? (player === 'X' ? 'Knight' : 'Queen');

  // Colors aligned to Ocean Professional theme
  const primary = 'var(--color-primary)';   // for X/Knight
  const secondary = 'var(--color-secondary)'; // for O/Queen'
  const fill = player === 'X' ? primary : secondary;

  // Using inline SVGs to avoid external deps. Icons are simplified for clarity.
  if (player === 'X') {
    // Knight icon
    return (
      <svg
        role="img"
        aria-label={label}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        focusable="false"
        className="ttt-icon ttt-icon-knight"
      >
        <title>{label}</title>
        <path
          d="M5 21h12v-2H6.5c-.28 0-.5-.22-.5-.5v-2.34c0-.49.18-.96.5-1.33l4.08-4.63c.27-.31.42-.71.42-1.12 0-.95-.77-1.72-1.72-1.72-.39 0-.77.13-1.07.38l-.86.71c-.21.17-.5.2-.73.07l-1.67-.95c-.31-.18-.43-.58-.27-.9l.88-1.76A2.5 2.5 0 0 1 10.14 2H14c.55 0 1 .45 1 1v2.5c0 .38.22.72.56.89.91.46 1.44 1.19 1.44 2.11V12c0 .28-.22.5-.5.5h-2.75a.5.5 0 0 0-.35.15l-2.9 2.9c-.13.13-.2.3-.2.48V18.5c0 .28.22.5.5.5H17v2H5z"
          fill={fill}
          fillOpacity="0.95"
        />
      </svg>
    );
  }

  // Queen icon
  return (
    <svg
      role="img"
      aria-label={label}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      focusable="false"
      className="ttt-icon ttt-icon-queen"
    >
      <title>{label}</title>
      <path
        d="M12 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6 .75a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 18 3.75ZM6 3.75a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 6 3.75Zm12.5 5.05-2.27 2.87a.75.75 0 0 1-1.26-.17L13.6 8.2a.25.25 0 0 0-.44.02L11.5 12a.75.75 0 0 1-1.33.12L8.7 9.8a.25.25 0 0 0-.43.05L6.5 11.9a1 1 0 0 1-1.53.16 7.5 7.5 0 0 1-.6-.64c-.19-.22-.18-.55.01-.77l3.26-3.75c.2-.23.54-.28.79-.13l2.71 1.6 1.33-2.21c.2-.34.69-.37.94-.06l2.03 2.4 2.88-1.59c.28-.16.63-.05.8.23l1.52 2.57c.15.25.12.57-.07.79a7 7 0 0 1-.97.99 1 1 0 0 1-1.48-.13ZM6.25 19c0-.55.45-1 1-1h9.5c.55 0 1 .45 1 1v1.5c0 .28-.22.5-.5.5h-10.5a.5.5 0 0 1-.5-.5V19Z"
        fill={fill}
        fillOpacity="0.95"
      />
    </svg>
  );
}
