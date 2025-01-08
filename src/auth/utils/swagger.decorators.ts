import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

export const LoginSwaggerDocs = () => {
  return [
    ApiOperation({
      summary: 'User login',
      description: 'Authenticates the user and returns a JWT token if valid credentials are provided.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Login successful, returns JWT token',
      schema: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'JWT_TOKEN' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string', example: 'user-id' },
              email: { type: 'string', example: 'user@example.com' },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid credentials',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
    }),
    ApiBody({
      description: 'User credentials for login',
      type: LoginDto,
    }),
  ];
};

export const SignUpSwaggerDocs = () => {
  return [
    ApiOperation({
      summary: 'User sign-up',
      description: 'Creates a new user and returns a JWT token on successful registration',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User successfully registered and token generated.',
      schema: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'JWT_TOKEN' },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request (e.g., missing required fields or invalid data)',
    }),
    ApiBody({
      description: 'Sign up user credentials',
      type: SignUpDto,
    }),
  ];
};
