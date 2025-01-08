import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const { email, password, fullname } = signUpDto;

    const userExist = await this.userService.findUserByEmail(email);

    if (userExist) {
      throw new ConflictException('user already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser({
      email,
      fullname,
      password: hashedPassword,
    });
    const payload = { id: user.id };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES'),
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User successfully registered',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('invalid email or password');
    }

    const payload = { id: user.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES'),
    });

    return {
      // status: HttpStatus.OK,
      // message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
