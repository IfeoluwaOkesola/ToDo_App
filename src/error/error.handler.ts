import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomErrorFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();

      this.logger.warn(`Handled Error: ${JSON.stringify(message)}`);

      response.status(status).json({
        statusCode: status,
        message: message['message'] || message,
        error: exception.name,
        timestamp: new Date().toISOString(),
      });
    } else {
      this.logger.error('Unhandled Error:', exception);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
