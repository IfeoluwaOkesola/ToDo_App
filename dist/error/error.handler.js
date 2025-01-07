"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let CustomErrorFilter = class CustomErrorFilter {
    catch(error, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const logger = new common_1.Logger();
        const message = error.getResponse().message;
        if (error instanceof common_1.NotFoundException) {
            logger.log(error.message);
            const message = error.message.includes(request.path)
                ? 'Route not found'
                : error.message;
            return response.status(404).json({
                status: 404,
                message: message,
                path: request.path,
                timestamp: new Date().toISOString(),
                error: 'Not Found',
            });
        }
        if (error instanceof common_1.BadRequestException) {
            if (typeof message === 'object') {
                const responseMessage = message.map((data) => {
                    const errors = [];
                    for (const key of Object.keys(data.constraints)) {
                        errors.push(data.constraints[key]);
                    }
                    return {
                        field: data.property,
                        errors,
                    };
                });
                return response.status(404).json({
                    status: 400,
                    message: responseMessage,
                    path: request.path,
                    timestamp: new Date().toISOString(),
                    error: 'Bad Request',
                });
            }
            return response.status(404).json({
                status: 400,
                message: message,
                path: request.path,
                timestamp: new Date().toISOString(),
                error: 'Bad Request',
            });
        }
        if (error instanceof common_1.UnauthorizedException) {
            logger.log(error.message);
            return response.status(404).json({
                status: 401,
                message: message,
                path: request.path,
                timestamp: new Date().toISOString(),
                error: 'Unauthorized',
            });
        }
        if (error instanceof typeorm_1.QueryFailedError) {
            logger.log(error.message);
            return response.status(404).json({
                status: 500,
                message: message,
                path: request.path,
                timestamp: new Date().toISOString(),
                error: 'Internal server error',
            });
        }
        logger.error(error.message, error.stack);
        response.status(500).json({
            status: 500,
            message: 'Internal server error',
            timestamp: new Date(Date.now()).toISOString(),
        });
    }
};
exports.CustomErrorFilter = CustomErrorFilter;
exports.CustomErrorFilter = CustomErrorFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], CustomErrorFilter);
//# sourceMappingURL=error.handler.js.map