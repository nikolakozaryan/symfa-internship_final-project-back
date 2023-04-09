import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dishes')
export class Dish {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  product: string;

  @ApiProperty()
  @Column()
  productName: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column('float')
  price: number;

  @ApiProperty()
  @Column()
  prepareTime: number;

  @ApiProperty()
  @Column('float')
  rating: number;

  @ApiProperty()
  @Column()
  image: string;

  @Column()
  @Exclude()
  type: string;

  @Column()
  @Exclude()
  taste: string;
}
