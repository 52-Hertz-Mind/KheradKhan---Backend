import { ResponseMessageKey } from '../enums/response-message.enum';

export type ResponseMessage = {
  key: ResponseMessageKey;
  params?: Record<string, any>;
};

export type ApiResponse<T> = {
  type: 'SUCCESS' | 'FAILURE';
  message?: ResponseMessage;
  data: T | null;
};

export class ResponseUtil {
  static success<T>(message?: ResponseMessage, data?: T): ApiResponse<T> {
    return {
      type: 'SUCCESS',
      message,
      data,
    };
  }

  static failure(
    message: ResponseMessage,
    data: any = null,
  ): ApiResponse<null> {
    return {
      type: 'FAILURE',
      message,
      data,
    };
  }
}
