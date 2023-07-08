import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

interface exceptionResponseInterface {
  statusCode: number;
  path: string;
  message: string;
}

@Catch()
export class TestExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    /**
     * @step 1 : 필요 정보를 가져온다
     */
    const statusCode = this.getStatus(exception);
    const message = this.extractErrorMessage(exception);
    Logger.log(`[${statusCode}] ${message}`, TestExceptionFilter.name);

    /**
     * @step 2 : 응답 가공
     */
    const responseBody: exceptionResponseInterface = {
      statusCode: statusCode,
      path: this.httpAdapterHost.httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    /**
     * @step 3 : 다시 httpAdapter 에게 전달
     */
    this.httpAdapterHost.httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      statusCode,
    );
  }

  private extractErrorMessage(err: any): string {
    if (err.response) {
      if (err.response.data && err.response.data.message) {
        return err.response.data.message;
      } else if (err.response.message) {
        return err.response.message;
      }
    } else if (err.graphQLErrors && err.graphQLErrors.length > 0) {
      return err.graphQLErrors[0].message;
    }
    if (err.message) {
      return err.message;
    }
    Logger.error(`미확인 ERROR...`, TestExceptionFilter.name);
    return '알 수 없는 에러가 발생하였습니다.';
  }

  private getStatus(exception: unknown): number {
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    return httpStatus;
  }
}
