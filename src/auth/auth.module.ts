import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/repository/user.repository';
import { PassportModule } from '@nestjs/passport';
import { config } from 'src/shared/config/config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Module({
  imports: [
    // PassportModule with default strategy as 'jwt'
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Async JWT configuration using ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Access JWT secret
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES', '60s'), // Default to '60s' if not set
        },
      }),
      global: true,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, UserService],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
