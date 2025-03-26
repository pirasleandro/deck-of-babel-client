<script setup lang="ts">
import type { QMenuProps } from 'quasar';

type Option = {
  name: string;
  label?: string;
  icon?: string;
  handler?: () => void;
};

defineProps<
  {
    options: Option[];
  } & QMenuProps
>();
</script>

<template>
  <q-menu context-menu transition-duration="0">
    <q-list dense>
      <q-item
        v-for="option in options"
        :key="option.name"
        :clickable="option.handler !== undefined"
        @click="option.handler"
      >
        <q-item-section side>
          <q-icon :name="option.icon" size="xs" />
        </q-item-section>
        <q-item-section>
          {{ option.label }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<style scoped lang="scss"></style>
