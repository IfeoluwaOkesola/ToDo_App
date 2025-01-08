import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
//import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

AuthService;

@Injectable()
export class AuthGuard {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET, // You can change this if you're using the ConfigService
      });
      request.user = payload; // Store the decoded payload in the request for later use
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authorization = request.headers['authorization'];
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.split(' ')[1];
    }
    return undefined;
  }
}
