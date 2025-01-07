import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from './shared/config/config.service';
import { CustomErrorFilter } from './error/error.handler';

async function bootstrap() {
  const logger = new Logger('Server');
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters( new CustomErrorFilter());
  await app.listen(config().PORT.APP_PORT, () => {
    logger.log(`Server started on ${config().PORT.APP_PORT}`);
  });
}
bootstrap();
