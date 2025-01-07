import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
export declare class CustomErrorFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost): Response<any, Record<string, any>>;
}
