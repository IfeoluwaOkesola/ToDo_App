import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../shared/dto/auth.dto';
import { Public } from 'src/shared/middleware/auth.middleware';
import { SignUpDto } from '../shared/dto/auth.dto';

@Controller('/v1/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('/signup')
  async signUpUser(@Body() data: SignUpDto) {
    return await this.authService.signUp(data);
  }

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
