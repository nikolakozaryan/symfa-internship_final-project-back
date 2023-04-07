import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dishes')
export class Dish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product: string;

  @Column()
  productName: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column('float')
  price: number;

  @Column()
  prepareTime: number;

  @Column('float')
  rating: number;

  @Column()
  image: string;
}
