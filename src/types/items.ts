import type { Player } from './game-state';
import type { HexColor, Id } from './util';

export interface ItemDefinition {
  id: Id<ItemDefinition>;
}

export interface Item {
  id: Id<Item>;
  definition: Id<ItemDefinition>;
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

/**
 * An instance of a card in-game.
 */
export interface Card extends Item {
  id: Id<Card>;
  definition: Id<CardDefinition>;
}

export type TokenContents = {
  color: HexColor;
  text: string;
}
/**
 * A token definition represents the definition of a token taken from a token bag.
 */
export interface TokenDefinition extends ItemDefinition {
  id: Id<TokenDefinition>;
  /** Color of the token. */
  contents: TokenContents;
}

/**
 * An instance of a token in-game.
 */
export interface Token extends Item {
  id: Id<Token>;
  definition: Id<TokenDefinition>;
}