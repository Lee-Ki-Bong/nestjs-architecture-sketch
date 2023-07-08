import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TestInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const requestType = context.getType();
    const ctx = context.switchToHttp();
    const controllerName = context.getClass().name;
    const request = ctx.getRequest<Request>();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    return next.handle().pipe(
      tap((response) => {
        const result = JSON.stringify(response).substring(0, 200);
        Logger.log(
          `[${requestType}] [${controllerName}] [${method}] [${url}] [${result}] ${
            Date.now() - now
          }ms`,
          TestInterceptor.name,
        );
      }),
    );
  }
}
