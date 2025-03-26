<script setup lang="ts">
import { computed } from 'vue';
import type { Card, CardDefinition } from 'src/types/items';
import ContextMenu from './ContextMenu.vue';
import { useGameStore } from 'src/stores/game';
import { useSocket } from 'src/composables/socket';

const socket = useSocket();

const game = useGameStore();

const props = defineProps<{
  card?: Card;
}>();

const definition = computed(() => props.card?.definition ? (game.definitions.get(props.card.definition) as CardDefinition) : undefined);
</script>

<template>
  <q-card flat bordered class="playing-card column">
    <q-card-section class="q-pa-sm">
      {{ definition?.contents ?? '<Empty>' }}
    </q-card-section>
    <q-space />
    <q-card-section class="q-pa-sm text-caption text-grey">
      {{ definition?.creator ?? 'Unknown' }}
    </q-card-section>
    <ContextMenu
      :options="[
        {
          name: 'clone',
          label: 'Clone',
          icon: 'sym_r_content_copy',
          handler: () => card?.definition ? socket.action({ type: 'create-temporary-copy', args: { definition: card?.definition } }) : undefined,
        },
        {
          name: 'cloneAndAddToPool',
          label: 'Clone and Add to Pool',
          icon: 'sym_r_content_copy',
          handler: () => $q.notify('TODO: clone card and add to pool')
        }
      ]"
    />
  </q-card>
</template>

<style scoped lang="scss">
.playing-card {
  width: 80px;
  height: 130px;
}
</style>
