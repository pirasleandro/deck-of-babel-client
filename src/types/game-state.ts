import type { Socket } from 'socket.io-client';
import type { Item, ItemDefinition, Card, CardDefinition, TokenDefinition } from './items';
import type { Id, Timestamp } from './util';
import { Container, Pile } from './containers';

export interface GameState {
  /**
   * This is a list of all items in the game and how many copies they have.
   * You'll be able to make a copy of any of these items when creating a new one.
   * Destroying an item will by default not change the number contained in the game, unless you select "destroy permanently".
   * Nor will creating a copy of an item unless you select "create permanent copy".
   * When you reshuffle for a new game, the cards in the card pool will be the only cards in the deck.
   * Objects can be in the item pool with a value of 0 (for instance, commonly used tokens which are only created by card effects)
   */
  itemPool: Map<ItemDefinition, number>;
  /** The board shared between all players. */
  sharedBoard: Board;
  /** The boards of the players. */
  playerBoards: Map<Id<Player>, Board>;
  /** All players in the game. */
  players: Player[];
} 

export interface Player {
  /** The player's id. */
  id: Id<Player>;
  /** The player's client socket id. */
  sockedId: Socket['id'];
  /** The player-chosen username. */
  name: string;
  /** The player's board. */
  board: Board;
  /** The player's hand pile (this zone is marked in particular so that it can be rendered uniquely.) */
  hand: Pile;
  /** The player's held zone (this zone follows the player's mouse cursor, after they grab any card or pile.) */
  held?: Container;
}

export interface Board {
  /** Containers on the board. */
  containers: Map<Id<Container>, Container>;
}