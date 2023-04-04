import { IsNotEmpty, IsString } from 'class-validator';

import { LoginUserDto } from './loginUser.dto';

export class CreateUserDto extends LoginUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
