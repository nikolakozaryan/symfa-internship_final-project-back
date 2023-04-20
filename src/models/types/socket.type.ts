import type { Socket } from 'socket.io';

export type SocketWithUserID = Socket & { userId: string };
