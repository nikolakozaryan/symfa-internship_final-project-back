import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateUserDto } from '@models/dto/user/createUser.dto';
import { User } from '@entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private _usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return this._usersRepository.findOneBy({ email });
  }

  async findOneById(id: string): Promise<User> {
    return this._usersRepository.findOneBy({ id });
  }

  async updateRefreshToken(id: string, newRt: string): Promise<void> {
    this._usersRepository.update(id, { refreshToken: newRt });
  }

  async deleteRefreshToken(id: string): Promise<void> {
    this._usersRepository.update(id, { refreshToken: null });
  }

  async create(data: CreateUserDto): Promise<User> {
    const avatar = `/public/avatars/${Math.floor(1 + Math.random() * 20)}.png`;

    return this._usersRepository.save({ ...data, avatar });
  }

  async toggleFav(userId: string, dishId: string): Promise<void> {
    const user = await this.findOneById(userId);

    const isDishFav = user.favs.includes(dishId);

    const favs = isDishFav ? user.favs.filter((item: string) => item !== dishId) : [...user.favs, dishId];

    await this._usersRepository.save({ ...user, favs });
  }
}
