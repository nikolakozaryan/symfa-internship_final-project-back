import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import type { Delivery } from '@entities/delivery.entity';
import type { SocketWithUserID } from '@models/types';
import { Config } from '@core/config';
import { SOCKET_EVENTS } from '@models/enums/socket-events';
import { UsersService } from '@shared/user/services';

import type { Server } from 'socket.io';

@WebSocketGateway(Config.get.GatewayConfig)
export class DeliveryGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private _userService: UsersService) {}

  async handleConnection(client: SocketWithUserID): Promise<void> {
    await this._userService.updateSocketId(client.userId, client.id);
  }

  async handleDisconnect(client: SocketWithUserID): Promise<void> {
    await this._userService.updateSocketId(client.userId, null);
  }

  sendDelivery(delivery: Delivery): void {
    const { deliveryman, destination, deliveryDate, user, id } = delivery;

    this.server.to(user.socketId).emit(SOCKET_EVENTS.Delivery, { id, deliveryman, destination, deliveryDate });
  }
}
