import type { Socket } from 'socket.io-client';
import type { Item, ItemDefinition, Card, CardDefinition, TokenType } from './items';
import type { Id, Timestamp } from './util';

export interface GameState {
  /**
   * This is a list of all cards in the game and how many copies they have.
   * You'll be able to make a copy of any of these cards when creating a new custom card.
   * When you reshuffle for a new game, the cards in the card pool will be the only cards in the deck.
   */
  cardPool: Map<CardDefinition, number>;
  /**
   * List of all token types in the game.
   */
  tokenTypes: TokenType[];
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
  /** The player's hand zone (this zone is marked in particular so that it can be rendered uniquely.) */
  hand: Pile<Card>;
  /** The player's held zone (this zone follows the player's mouse cursor, after they grab any card or pile.) */
  held: Pile<Card>;
}

export interface Board {
  /** Piles on the board. */
  piles: Map<Id<Pile<Item>>, Pile<Item>>;
  bags: Map<Id<Bag<Item>>, Bag<Item>>;
}

/**
 * Functions like a sorted list of items, mimicking a pile of cards.
 *
 * @example
 * let deck: Pile<Card>;
 * let hand: Pile<Card>;
 * let artifacts: Pile<ArtifactToken>;
 */
export interface Pile<T extends Item> {
  id: Id<Pile<T>>;
  /** The items in the pile, in order. */
  items: T[];
  /** The visibility of the pile. All items in the pile gain this visibility. */
  visibility: Visibility;
  /**
   * When the pile was last modified. On the server-side, it will be used
   *
   * to make sure that if two players aim to access a pile at the same time, only the first action will be used.
   * On the client-side, you should sort pile depth by last-modified so you can pick up a pile to bring it to the top of a stack.
   */
  lastModified: Timestamp;
}

/**
 * Functions like a counter for a specific {@linkcode ItemDefinition }, mimicking a bag of tokens.
 *
 * @example
 * let lifes: Bag<LifeToken>;
 * let coins: Bag<Coin>;
 */
export interface Bag<T extends Item> {
  id: Id<Bag<T>>;
  item: ItemDefinition;
  /** The amount of items in this bag. Can be set to `Infinity`. */
  count: number;
  /** The visibility of {@linkcode count} */
  countVisibility: Visibility;
  /**
   * When the bag was last modified. On the server-side, it will be used
   *
   * to make sure that if two players aim to access a bag at the same time, only the first action will be used.
   * On the client-side, you should sort bag depth by last-modified so you can pick up a bag to bring it to the top of a stack.
   */
  lastModified: Timestamp;
}

/** The visibility of an object. */
export type Visibility =
  | {
      /** Only a certain set of players may access this object. */
      type: 'hidden';
      player: Set<Id<Player>>;
    }
  | {
      /** All players may can access this object.  */
      type: 'public';
    };
