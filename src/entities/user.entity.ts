import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  avatar: string;

  @ApiProperty({ type: [String] })
  @Column('text', { array: true, default: [] })
  favs: string[];

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ default: null })
  refreshToken: string;
}
