import { Player } from "./game-state";
import { Item, ItemDefinition } from "./items";
import { Id, Timestamp } from "./util";


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


export interface Container {
    id: Id<Container>;
    type: string;
    lastModified: Timestamp;  /**
    * When the pile was last modified.
    * On the client-side, you should sort pile depth by last-modified so you can pick up a pile to bring it to the top of a stack.
    * On the server-side, it can be used to keep track of contention between multiple requests that modify the same container.
    */
    itemVisibilty: Visibility;
  }
  
/**
 * Functions like a sorted list of items, mimicking a pile of cards.
 * 
 * For example, a deck or hand of cards.
 */
export interface Pile extends Container {
  id: Id<Pile>;
  /** The items in the pile, in order. */
  items: Item[];
}

/**
 * Functions like a counter for a specific {@linkcode ItemDefinition }, allowing you to keep track of a number of the same item.
 * 
 * For example, a stack of Coin tokens to keep track of a money pool, or a stack of many copies of a common card type.
 */
export interface Counter {
  id: Id<Counter>;
  item: ItemDefinition;
  /** The amount of items in this counter. Can be set to `Infinity`. */
  count: number;
  /** The visibility of {@linkcode count} */
  countVisibility: Visibility;
  /**
   * When the counter was last modified. On the server-side, it will be used
   *
   * to make sure that if two players aim to access a counter at the same time, only the first action will be used.
   * On the client-side, you should sort counter depth by last-modified so you can pick up a counter to bring it to the top of a stack.
   */
}