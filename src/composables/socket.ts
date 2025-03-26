import { socket } from 'boot/socket';
import type { ItemAction, RegisterAction } from 'src/types/actions';

export const useSocket = () => {
  function action<A extends ItemAction | RegisterAction>(action: A) {
    socket.emit('item', action);
  }

  return {
    ...socket,
    action,
  };
};
