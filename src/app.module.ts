import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestMiddleware } from './test.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TestInterceptor } from './test.interceptor';
import { TestExceptionFilter } from './test.exception-filter';
import { TestGuard } from './test.guard';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: TestGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TestInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: TestExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes('*');
  }
}
