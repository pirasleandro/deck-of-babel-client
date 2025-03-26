import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { socket } from 'boot/socket';
import type { Position } from 'src/types/util';

export const useCursorStore = defineStore('cursor', () => {
  const pos: Ref<Position> = ref<Position>({ x: 0, y: 0 });

  document.addEventListener('mousemove', (event: MouseEvent) => {
    pos.value = { x: event.clientX, y: event.clientY };
    socket.emit('mouse-move', { ...pos.value });
  });

  return {
    pos,
  };
});
