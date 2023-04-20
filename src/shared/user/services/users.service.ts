import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateUserDto } from '@models/dto/user/create-user.dto';
import { User } from '@entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private _usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const avatar = data.avatar || `/public/avatars/${Math.floor(1 + Math.random() * 20)}.png`;

    return this._usersRepository.save({ ...data, avatar });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this._usersRepository.findOneBy({ email });
  }

  async findOneById(id: string): Promise<User> {
    return this._usersRepository.findOneBy({ id });
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    this._usersRepository.update(userId, { refreshToken });
  }

  async updateSocketId(userId: string, socketId: string | null): Promise<void> {
    await this._usersRepository.update(userId, { socketId });
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    await this._usersRepository.update(userId, { password });
  }

  async deleteRefreshToken(id: string): Promise<void> {
    this._usersRepository.update(id, { refreshToken: null });
  }

  async toggleFav(userId: string, dishId: string): Promise<void> {
    const user = await this.findOneById(userId);

    const isDishFav = user.favs.includes(dishId);

    const favs = isDishFav ? user.favs.filter((item: string) => item !== dishId) : [...user.favs, dishId];

    await this._usersRepository.save({ ...user, favs });
  }
}
