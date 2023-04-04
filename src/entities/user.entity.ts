import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  avatar: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ default: null })
  refreshToken: string;
}
