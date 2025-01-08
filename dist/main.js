"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./shared/config/config.service");
const error_handler_1 = require("./error/error.handler");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const logger = new common_1.Logger('Server');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('TODO API documentation')
        .setDescription('Contains all API related to TODO_app')
        .setVersion('v1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('/v1', app, document);
    app.useGlobalFilters(new error_handler_1.CustomErrorFilter());
    await app.listen((0, config_service_1.config)().PORT.APP_PORT, () => {
        logger.log(`Server started on ${(0, config_service_1.config)().PORT.APP_PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map