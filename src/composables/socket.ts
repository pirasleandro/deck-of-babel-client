import { socket } from 'boot/socket';
import type { ItemAction } from 'src/types/actions';

export const useSocket = () => {
  function action<A extends ItemAction>(type: A['type'], args: A['args']) {
    socket.emit('item', { type, args });
  }

  return {
    ...socket,
    action,
  };
};
