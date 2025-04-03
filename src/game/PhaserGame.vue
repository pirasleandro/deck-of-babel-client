<script setup lang="ts">

import { onMounted, onUnmounted, ref } from 'vue';
import startGame from 'src/game/main';
import { EventBus } from 'src/game/EventBus';
import type { Game, Scene } from 'phaser';

const scene = ref<Scene>();
const game = ref<Game>();

const emit = defineEmits<{
  (e: 'scene-changed', scene: Phaser.Scene): void
}>();

onMounted(() => {
  game.value = startGame('game-container');

  EventBus.on('current-scene-ready', (currentScene: Phaser.Scene) => {
    emit('scene-changed', currentScene);
    scene.value = currentScene;
  });
});

onUnmounted(() => {
  game.value?.destroy(true);
  game.value = undefined;
});

defineExpose({ scene, game });
</script>

<template>
  <div id="game-container" />
</template>

<style scoped lang="scss">

</style>
