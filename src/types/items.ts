import type { Player } from './game-state';
import type { HexColor, Id } from './util';

export interface Item {
  id: Id<Item>;
  definition: Id<ItemDefinition>;
}

export interface ItemDefinition {
  id: Id<ItemDefinition>;
}

/**
 * A card definition represents the definition of a card added to the card pool.
 */
export interface CardDefinition extends ItemDefinition {
  id: Id<CardDefinition>;
  /** The person who created the card (we will probably display this in the corner of the card) */
  creator: Id<Player>;
  contents: CardContents;
}

/** Currently, the contents of cards are just strings. */
export type CardContents = string;

export interface Draggable {
  /** Normalized from 0 to 1 across the top of a board. */
  x: number;
  /** Proportional to x. */
  y: number;
}

/**
 * An instance of a card in-game.
 */
export interface Card extends Item {
  id: Id<Card>;
  definition: Id<CardDefinition>;
  tokens: Map<Token, number>;
}

/**
 * A token definition represents the definition of a token taken from a token bag.
 */
export interface TokenType extends ItemDefinition {
  id: Id<TokenType>;
  /** Color of the token. */
  color: HexColor;
}

/**
 * An instance of a token in-game.
 */
export interface Token extends Item {
  id: Id<Token>;
  definition: Id<TokenType>;
}
