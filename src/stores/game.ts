import { defineStore } from 'pinia';
import type { Container } from 'src/types/containers';
import type { Board, GameState, Player } from 'src/types/game-state';
import type { ItemDefinition } from 'src/types/items';
import type { Id } from 'src/types/util';
import { type ComputedRef, computed, reactive } from 'vue';

export const useGameStore = defineStore('game', () => {
  const state: GameState = reactive<GameState>({
    itemPool: new Map<ItemDefinition, number>(),
    players: [],
    playerBoards: new Map<Id<Player>, Board>(),
    sharedBoard: { containers: new Map<Id<Container>, Container>() },
  });

  const definitions: ComputedRef<Map<Id<ItemDefinition>, ItemDefinition>> = computed(
    () =>
      new Map<Id<ItemDefinition>, ItemDefinition>(
        [...state.itemPool.keys()].map((definition) => [definition.id, definition]),
      ),
  );

  return {
    ...state,
    definitions,
  };
});
