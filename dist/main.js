"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./shared/config/config.service");
const error_handler_1 = require("./error/error.handler");
async function bootstrap() {
    const logger = new common_1.Logger('Server');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new error_handler_1.CustomErrorFilter());
    await app.listen((0, config_service_1.config)().PORT.APP_PORT, () => {
        logger.log(`Server started on ${(0, config_service_1.config)().PORT.APP_PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map