import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
    BadRequestException,
    HttpException,
    UnauthorizedException,
    Logger,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { QueryFailedError } from 'typeorm';
  
  @Catch(HttpException)
  export class CustomErrorFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();
      const logger = new Logger();
  
      const message = error.getResponse().message;
  
      if (error instanceof NotFoundException) {
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
  
      if (error instanceof BadRequestException) {
        if (typeof message === 'object') {
          const responseMessage = message.map((data: any) => {
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
  
      if (error instanceof UnauthorizedException) {
        logger.log(error.message);
        return response.status(404).json({
          status: 401,
          message: message,
          path: request.path,
          timestamp: new Date().toISOString(),
          error: 'Unauthorized',
        });
      }
  
      if (error instanceof QueryFailedError) {
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
  }
  