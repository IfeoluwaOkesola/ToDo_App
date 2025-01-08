"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CustomErrorFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorFilter = void 0;
const common_1 = require("@nestjs/common");
let CustomErrorFilter = CustomErrorFilter_1 = class CustomErrorFilter {
    constructor() {
        this.logger = new common_1.Logger(CustomErrorFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const message = exception.getResponse();
            this.logger.warn(`Handled Error: ${JSON.stringify(message)}`);
            response.status(status).json({
                statusCode: status,
                message: message['message'] || message,
                error: exception.name,
                timestamp: new Date().toISOString(),
            });
        }
        else {
            this.logger.error('Unhandled Error:', exception);
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An unexpected error occurred',
                timestamp: new Date().toISOString(),
            });
        }
    }
};
exports.CustomErrorFilter = CustomErrorFilter;
exports.CustomErrorFilter = CustomErrorFilter = CustomErrorFilter_1 = __decorate([
    (0, common_1.Catch)()
], CustomErrorFilter);
//# sourceMappingURL=error.handler.js.map