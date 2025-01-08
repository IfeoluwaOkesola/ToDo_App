"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const config_service_1 = require("./shared/config/config.service");
const typeorm_1 = require("@nestjs/typeorm");
const datasource_1 = require("./database/datasource");
const core_1 = require("@nestjs/core");
const error_handler_1 = require("./error/error.handler");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_service_1.config],
            }),
            typeorm_1.TypeOrmModule.forRoot(datasource_1.dataSourceOptions),
            user_module_1.UserModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: error_handler_1.CustomErrorFilter,
            },
            app_service_1.AppService
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map