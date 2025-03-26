import { defineBoot } from '@quasar/app-vite/wrappers';
import { io, type Socket } from 'socket.io-client';

declare module 'vue' {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}

const URL = 'http://localhost:3000';

const socket = io(URL, { autoConnect: true });

export default defineBoot(({ app }) => {
  socket.on('connect', () => {
    console.log('[ws] connected to socket');
  });

  socket.on('disconnect', () => {
    console.log('[ws] disconnected from socket');
  });

  socket.on('join-room', (room: string) => {
    console.log('[ws] joined room', room);
  });

  socket.emit('ping', (response: string) => console.log('[ws] ping:', response));
  app.config.globalProperties.$socket = socket;
});

export { socket };
