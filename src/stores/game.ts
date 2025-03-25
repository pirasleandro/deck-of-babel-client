import type { Bag, Board, GameState, Pile, Player } from 'src/types/game-state';
import type { CardDefinition, Item } from 'src/types/items';
import type { Id } from 'src/types/util';
import { reactive } from 'vue';

export const useGameStore = () => {
  const fullGameState: GameState = reactive<GameState>({
    cardPool: new Map<CardDefinition, number>(),
    tokenTypes: [],
    players: [],
    playerBoards: new Map<Id<Player>, Board>(),
    sharedBoard: {
      piles: new Map<Id<Pile<Item>>, Pile<Item>>(),
      bags: new Map<Id<Bag<Item>>, Bag<Item>>(),
    },
  });

  return {
    fullGameState,
  };
};
