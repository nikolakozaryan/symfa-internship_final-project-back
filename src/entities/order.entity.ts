import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Dish } from './dish.entity';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  totalPrice: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user: User) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty()
  @ManyToMany(() => Dish)
  @JoinTable()
  dishes: Dish[];

  constructor(user: User, dishes: Dish[], totalPrice: number) {
    this.user = user;
    this.dishes = dishes;
    this.totalPrice = totalPrice;
  }
}
