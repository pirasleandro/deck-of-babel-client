import type { Player } from './game-state';
import type { Id } from './util';

/**
 * Sent by the client/server to update the other side on a state it controls.
 */
export type Update = object;

// #region [MOUSE EVENTS]

/**
 * Whenever a client moves their mouse, a MouseMoveEvent is sent to the server.
 * @see {@linkcode VirtualCursorMoveEvent}
 */
export interface MouseMoveEvent {
  board: Id<Player> | null;
  /** X coordinate of the cursor position. */
  x: number;
  /** Y coordinate of the cursor position. */
  y: number;
}

/** Sent by server to all other clients in response to receiving a {@linkcode MouseMoveEvent} */
export interface VirtualCursorMoveEvent {
  /** The identifier of the player who has moved their mouse. */
  player: Id<Player>;
  /** The (player) board the cursor is currently on, or null for the main board. */
  board: Id<Player> | null;
  /** X coordinate of the cursor position. */
  x: number;
  /** Y coordinate of the cursor position. */
  y: number;
}

// #endregion
