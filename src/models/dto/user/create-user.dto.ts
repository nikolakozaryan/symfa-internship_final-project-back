import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty({ description: 'User name', default: 'John Smith' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: false, description: 'avatar url', default: 'https://imagehub.com/avatar.png' })
  @IsOptional()
  @IsString()
  avatar?: string;
}
