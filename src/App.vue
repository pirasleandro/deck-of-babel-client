<template>
  <router-view />
</template>

<script setup lang="ts">
import { useCursorStore } from './stores/cursor';

// Initialize cursor store
useCursorStore();
</script>
