import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { LoginUserDto } from './loginUser.dto';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty({ description: 'User name', default: 'John Smith' })
  @IsNotEmpty()
  @IsString()
  username: string;
}
