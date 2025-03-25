import { Container, Counter, Pile, Visibility } from './containers';
import type { Player } from './game-state';
import type { Card, CardContents, CardDefinition, Item, ItemDefinition, TokenContents, TokenDefinition } from './items';
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
// Sent by client when performing any actions on items or containers.

/**
 * Takes the top N items of the container, placing them into your held zone as the same type of container.
 * This is a convenient action for setup.
 */
export type DrawItemsAction = {
  type: 'draw-items';
  args: {
    container: Id<Container>;
    number: number;
  };
};

/**
 * Removes a specific item from a pile, placing it into your held zone as a pile.
 * It will fail if that specific card is no longer in the pile, or if the pile was shuffled more recently than this action.
 * Note: this does not work for counters, since the items inside them are not unique.
 * You can use Draw Items (number = 1) to take an item out of a counter.
 */
export type GrabItemAction = {
  type: 'grab-item';
  args: {
    pile: Id<Pile>;
    item: Id<Item>;
  };
};

/**
 * Removes a container from the board, placing it into your held zone.
 */
export type GrabContainerAction = {
  type: 'grab-container';
  args: {
    container: Id<Container>;
  };
};

/**
 * Drops your held zone into an existing container at a certain index.
 * Index is ignored when adding into a Counter.
 * This action may fail in cases where it doesn't make sense to combine the two containers
 * (for instance, if you try to drop multiple unique items into a counter,
 * or if you try to drop a counter of unreasonable size into a pile.)
 */
export type DropIntoAction = {
  type: 'drop-into';
  args: {
    container: Id<Container>;
    index: number;
  };
};

/**
 * Drops your held zone onto the board as a new container.
 */
export type DropAtAction = {
  type: 'drop-at';
  args: {
    board: Id<Player> | null;
    x: number;
    y: number;
    visibility: Visibility;
  };
};

/**
 * Modifies a container's item visibility.
 */
export type SetContainerVisibilityAction = {
  type: 'set-container-visibility';
  args: {
    container: Id<Container>;
    visibility: Visibility;
  };
};

/**
 * Modifies a counter's count visibility.
 */
export type SetCounterCountVisibilityAction = {
  type: 'set-counter-count-visibility';
  args: {
    counter: Id<Counter>;
    visibility: Visibility;
  };
};

/**
 * Modifies a counter's count by incrementing or decrementing it. (use a negative number to decrement)
 */
export type IncrementCounterAction = {
  type: 'increment-counter';
  args: {
    counter: Id<Counter>;
    increment: number;
  };
};

/**
 * Modifies a counter's count by directly setting it.
 */
export type SetCounterAction = {
  type: 'set-counter';
  args: {
    counter: Id<Counter>;
    count: number;
  };
};

/**
 * Creates a (temporary) copy of an existing item. The copy becomes held.
 * If a count is provided, create the item as a counter.
 */
export type CreateTemporaryCopyAction = {
  type: 'create-temporary-copy';
  args: {
    definition: Id<ItemDefinition>;
    count?: number;
  };
};

/**
 * Destroys the items you are holding.
 */
export type DestroyItemsAction = {
  type: 'destroy-items';
  args: {
  };
};

/**
 * Creates a custom card definition. This doesn't actually add a copy of it to the item pool, you should also change it's count.
 */
export type CreateCardDefinitionAction = {
  type: 'create-card-definition';
  args: {
    contents: CardContents;
  };
};

/**
 * Creates a custom token definition. This doesn't actually add a copy of it to the item pool, you should also change it's count.
 */
export type CreateTokenDefinitionAction = {
  type: 'create-token-definition';
  args: {
    contents: TokenContents;
  };
};

/**
 * Edits an existing card definition. This will change ALL items that use this definition.
 */
export type EditCardDefinitionAction = {
  type: 'edit-card-definition';
  args: {
    definition: Id<CardDefinition>,
    contents: CardContents;
  };
};

/**
 * Edits an existing token definition. This will change ALL items that use this definition.
 */
export type EditTokenDefinitionAction = {
  type: 'edit-token-definition';
  args: {
    definition: Id<TokenDefinition>,
    contents: TokenContents;
  };
};

/**
 * Changes the number of items of a certain type in the item pool. Use this to permanently add or remove copies of an item.
 */
export type ChangeItemPoolAction = {
  type: 'change-item-pool';
  args: {
    definition: Id<ItemDefinition>;
    increment: number;
  };
};

/**
 * Shuffles a pile.
 */
export type ShufflePileAction = {
  type: 'shuffle-pile';
  args: {
    pile: Id<Pile>;
  };
};

/**
 * Converts a pile into a counter or vice versa, if possible.
 */
export type ConvertContainerAction = {
  type: 'convert-container';
  args: {
    pile: Id<Container>;
  };
};

// #endregion

export type RegisterAction =
  RegisterUserAction |
  EditUsernameAction

export type ItemAction =
  DrawItemsAction |
  GrabItemAction |
  GrabContainerAction |
  DropIntoAction |
  DropAtAction |
  SetContainerVisibilityAction |
  SetCounterCountVisibilityAction |
  IncrementCounterAction |
  SetCounterAction |
  CreateTemporaryCopyAction |
  DestroyItemsAction |
  CreateCardDefinitionAction |
  CreateTokenDefinitionAction |
  EditCardDefinitionAction |
  EditTokenDefinitionAction |
  ChangeItemPoolAction |
  ShufflePileAction |
  ConvertContainerAction