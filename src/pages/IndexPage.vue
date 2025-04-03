<script setup lang="ts">
import { ref } from 'vue';
import { socket } from 'boot/socket';
import { useCursorStore } from 'src/stores/cursor';

const cursor = useCursorStore();

const roomCode = ref<string>();

function createGame() {
  socket.emit('create-game', roomCode.value, (game: unknown) => {
    if (!game) console.error('could not create', roomCode.value);
    else console.info('created and joined', roomCode.value);
  });
}

function joinGame() {
  socket.emit('join-game', roomCode.value, (game: unknown) => {
    if (!game) console.error('could not join', roomCode.value);
    else console.info('joined', roomCode.value);
  });
}
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <code>
      [x: {{ cursor.pos.x.toString().padStart(4, '0') }}, y:
      {{ cursor.pos.y.toString().padEnd(4, '0') }}]
    </code>
    <q-input v-model="roomCode" label="Room code">
      <template #after>
        <q-btn label="Join" @click="joinGame()" />
        <q-btn label="Create" @click="createGame()" />
      </template>
    </q-input>
  </q-page>
</template>
