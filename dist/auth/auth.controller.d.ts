import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUpUser(data: SignUpDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            fullname: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
        };
    }>;
}
