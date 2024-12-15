import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseUtil } from '../utils/response.util';
import { ResponseMessage } from '../utils/response.util';

@Injectable()
export class SuccessResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        // Expect controllers to return an object with `message` and `data`
        const { message, data }: { message: ResponseMessage; data: any } =
          response;
        return ResponseUtil.success(message, data);
      }),
    );
  }
}
