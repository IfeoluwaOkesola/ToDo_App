import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { config } from './shared/config/config.service';
import { CustomErrorFilter } from './error/error.handler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Server');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TODO API documentation')
    .setDescription('Contains all API related to TODO_app')
    .setVersion('v1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/v1', app, document);

  app.useGlobalFilters( new CustomErrorFilter());
  await app.listen(config().PORT.APP_PORT, () => {
    logger.log(`Server started on ${config().PORT.APP_PORT}`);
  });
}
bootstrap();
