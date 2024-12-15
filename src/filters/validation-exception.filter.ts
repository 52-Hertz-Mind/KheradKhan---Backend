import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseUtil } from '../utils/response.util';
import { ResponseMessageKey } from '../enums/response-message.enum';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;

    const exceptionResponse = exception.getResponse();

    // Extract validation errors
    const validationErrors =
      typeof exceptionResponse === 'object' &&
      (exceptionResponse as any).message instanceof Array
        ? (exceptionResponse as any).message
        : [exceptionResponse];

    // Return custom response structure
    response.status(status).json(
      ResponseUtil.failure(
        {
          key: ResponseMessageKey.VALIDATION_ERROR,
          params: { errors: validationErrors },
        },
        null,
      ),
    );
  }
}
