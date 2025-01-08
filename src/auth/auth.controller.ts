import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('/v1/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUpUser(@Body() data: SignUpDto) {
    return await this.authService.signUp(data);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto){
    return await this.authService.login(loginDto);
  }
}
