import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({
    example: 'SecurePassword123',
    description: 'Password for the user account',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}


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

