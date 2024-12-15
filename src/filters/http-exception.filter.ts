import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseUtil } from '../utils/response.util';
import { ResponseMessageKey } from '../enums/response-message.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : { key: ResponseMessageKey.VALIDATION_ERROR, params: {} };

    response
      .status(status)
      .json(
        ResponseUtil.failure(
          typeof message === 'string'
            ? { key: ResponseMessageKey.VALIDATION_ERROR, params: { message } }
            : (message as any),
          null,
        ),
      );
  }
}
