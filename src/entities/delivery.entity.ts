import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Deliveryman } from './deliveryman.entity';
import { User } from './user.entity';

@Entity('deliveries')
export class Delivery {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ApiProperty()
  @ManyToOne(() => Deliveryman)
  @JoinColumn()
  deliveryman: Deliveryman;

  @ApiProperty()
  @Column()
  deliveryDate: Date;

  @ApiProperty()
  @Column()
  destination: string;

  constructor(user: User, deliveryman: Deliveryman, deliveryDate: Date, destination: string) {
    this.user = user;
    this.deliveryman = deliveryman;
    this.deliveryDate = deliveryDate;
    this.destination = destination;
  }
}
