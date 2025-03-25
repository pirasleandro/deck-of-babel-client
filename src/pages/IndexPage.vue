<script setup lang="ts">
import { socket } from 'boot/socket';
import { ref } from 'vue';

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
    <q-input v-model="roomCode" label="Room code">
      <template #after>
        <q-btn label="Join" @click="joinGame()" />
        <q-btn label="Create" @click="createGame()" />
      </template>
    </q-input>
  </q-page>
</template>
