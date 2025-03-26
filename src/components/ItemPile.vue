<script setup lang="ts">
import ContextMenu from './ContextMenu.vue';

defineProps<{
  draggable?: boolean;
}>();
</script>

<template>
  <q-card class="item-pile" flat bordered>
    <q-card-section class="items row">
      <slot />
    </q-card-section>
    <ContextMenu
      :options="[
        {
          name: 'clone',
          label: 'Clone Pile',
          icon: 'sym_r_content_copy',
          handler: () => $q.notify('TODO: clone pile'),
        },
        { name: 'clone', label: 'Clone Pile', handler: () => $q.notify('TODO: clone pile') },
        { name: 'clone', label: 'Clone Pile', handler: () => $q.notify('TODO: clone pile') },
        {
          name: 'convertToCounter',
          label: 'Convert to Counter',
          handler: () => $q.notify('TODO: convert pile to counter'),
        },
      ]"
    />
  </q-card>
</template>

<style scoped lang="scss">
.item-pile {
  position: absolute;
}

.items > * {
  // margin-bottom: -100px;
}
</style>
