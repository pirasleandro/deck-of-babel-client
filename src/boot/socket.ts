import { defineBoot } from '@quasar/app-vite/wrappers';
import { io, type Socket } from 'socket.io-client';

declare module 'vue' {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}

const URL = 'http://localhost:3000';

const socket = io(URL, { autoConnect: true });

socket.on('connect', () => {
  console.log('[socket.ts] connected to socket');
});

socket.on('disconnect', () => {
  console.log('[socket.ts] disconnected from socket');
});

export default defineBoot(({ app }) => {
  app.config.globalProperties.$socket = socket;
});

export { socket };
