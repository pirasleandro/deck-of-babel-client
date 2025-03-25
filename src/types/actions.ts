import type { Pile, Player, Visibility } from './game-state';
import type { Card, CardContents, CardDefinition, Item } from './items';
import type { Id } from './util';

/**
 * Sent by the client to the server to request a change in the game state.
 */
export interface Action {
  type: string;
  args: Record<string, unknown>;
}

// #region [USER ACTIONS]

export type RegisterUserAction = {
  type: 'registerUser';
  args: {
    name: string;
  };
};

/**
 * Edits the player's username.
 */
export type EditUsernameAction = {
  type: 'editUsername';
  args: {
    username: string;
  };
};

// #endregion

// #region [ITEM ACTIONS]
// Sent by client when performing any actions on items or piles.

/**
 * Takes the top N cards of the pile, placing them into your hand.
 * This is a convenient action for setup.
 */
export type DrawCardsAction = {
  type: 'drawCards';
  args: {
    pile: Id<Pile<Card>>;
    numCards: number;
  };
};

/**
 * Removes a specific card from a pile, placing it into your held pile.
 * It will fail if that specific card is no longer in the pile, or if the pile was shuffled more recently than this action.
 */
export type GrabCardAction = {
  type: 'grabCard';
  args: {
    pile: Id<Pile<Card>>;
    index: Id<Card>;
  };
};

/**
 * Removes a pile from the board, placing it into your held pile.
 */
export type GrabPileAction = {
  type: 'grabPile';
  args: {
    pile: Id<Pile<Item>>;
  };
};

/**
 * Drops your held pile into an existing pile at a certain index.
 */
export type DropIntoAction = {
  type: 'dropInto';
  args: {
    pile: Id<Pile<Item>>;
    index: number;
    dropFaceDown: boolean;
  };
};

/**
 * Drops your held pile onto the board as a new pile.
 * If the player grabbed an individual card, the default should be to turn it face up for all players if they could see it.
 * But if the player grabbed a full pile, the visibility should remain the same by default.
 * This is so that players can play cards from their hand face-up by default.
 */
export type DropAtAction = {
  type: 'dropAt';
  args: {
    board: Id<Player> | null;
    x: number;
    y: number;
    visibility: Visibility;
  };
};

/**
 * Modifies a pile's visibility.
 */
export type SetPileVisibilityAction = {
  type: 'setPileVisibility';
  args: {
    pile: Id<Pile<Item>>;
    visibility: Visibility;
  };
};

/**
 * Creates a copy of an existing card definition.
 * The copy becomes held.
 * Note: you can probably do this either by going from the "custom card" screen,
 * or by right-clicking on an existing card.
 */
export type CreateCopyAction = {
  type: 'createCopy';
  args: {
    definition: Id<CardDefinition>;
    isToken: boolean; // If it's a token, it won't be added to the deck list.
  };
};

/**
 * Creates a custom card.
 */
export type CreateCustomCardAction = {
  type: 'createCustomCard';
  args: {
    contents: CardContents;
    isToken: boolean; // If it's a token, it won't be added to the deck list.
  };
};

/**
 * Destroys a card, permanently removing it's copy from the card pool.
 * You should grab the card first before destroying it
 * On the frontend, you'd probably right-click and select a destroy option, which would give a confirmation message.
 * While you are responding to that confirmation message, the card is counted as held,
 * because otherwise, the time taken to confirm might make contention on that card's pile likely.
 */
export type DestroyCardAction = {
  type: 'destroyCard';
  args: {
    pile: Id<Pile<Card>>;
    index: number;
  };
};

/**
 * Modifies a specific copy of a card, creating a new definition forking from the original.
 * You should grab the card first before modifying it
 * On the frontend, you'd probably right-click and select a modify option, which would give an editing prompt.
 * While you are responding to that prompt, the card is counted as held,
 * because otherwise, the time taken to respond might make contention on that card's pile likely.
 */
export type ModifyCardAction = {
  type: 'modifyCard';
  args: {
    contents: CardContents;
  };
};

/**
 * Shuffles a pile.
 */
export type ShufflePileAction = {
  type: 'shufflePile';
  args: {
    pile: Id<Pile<Item>>;
  };
};

// #endregion

/** Union type of all user actions */
export type UserAction = RegisterUserAction | EditUsernameAction;

/** Union type of all item actions */
export type CardAction =
  | DrawCardsAction
  | GrabCardAction
  | GrabPileAction
  | DropIntoAction
  | DropAtAction
  | ShufflePileAction
  | SetPileVisibilityAction
  | CreateCopyAction
  | CreateCustomCardAction
  | DestroyCardAction
  | ModifyCardAction
  | EditUsernameAction;

export type PileAction = ShufflePileAction;
