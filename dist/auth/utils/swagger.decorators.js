"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpSwaggerDocs = exports.LoginSwaggerDocs = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const login_dto_1 = require("../dto/login.dto");
const sign_up_dto_1 = require("../dto/sign-up.dto");
const LoginSwaggerDocs = () => {
    return [
        (0, swagger_1.ApiOperation)({
            summary: 'User login',
            description: 'Authenticates the user and returns a JWT token if valid credentials are provided.',
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.OK,
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
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.UNAUTHORIZED,
            description: 'Invalid credentials',
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.NOT_FOUND,
            description: 'User not found',
        }),
        (0, swagger_1.ApiBody)({
            description: 'User credentials for login',
            type: login_dto_1.LoginDto,
        }),
    ];
};
exports.LoginSwaggerDocs = LoginSwaggerDocs;
const SignUpSwaggerDocs = () => {
    return [
        (0, swagger_1.ApiOperation)({
            summary: 'User sign-up',
            description: 'Creates a new user and returns a JWT token on successful registration',
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.CREATED,
            description: 'User successfully registered and token generated.',
            schema: {
                type: 'object',
                properties: {
                    token: { type: 'string', example: 'JWT_TOKEN' },
                },
            },
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.BAD_REQUEST,
            description: 'Bad request (e.g., missing required fields or invalid data)',
        }),
        (0, swagger_1.ApiBody)({
            description: 'Sign up user credentials',
            type: sign_up_dto_1.SignUpDto,
        }),
    ];
};
exports.SignUpSwaggerDocs = SignUpSwaggerDocs;
//# sourceMappingURL=swagger.decorators.js.map