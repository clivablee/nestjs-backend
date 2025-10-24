import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Auth:", req.headers.authorization)

    if (req.headers.authorization !== 'Bearer token') {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
