import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user attempting to log in',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password associated with the user account',
    example: 'password123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
