import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = Date.now();
    Logger.debug(
      `[${Request.name}] ${req.method} ${req.baseUrl}`,
      TestMiddleware.name,
    );

    res.on('finish', () => {
      Logger.debug(
        `[${Response.name}] statusCode: ${res.statusCode} +${
          Date.now() - now
        }ms`,
        TestMiddleware.name,
      );
    });

    next();
  }
}
