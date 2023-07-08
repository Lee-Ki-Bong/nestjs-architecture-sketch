import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /**
     * @todo 인증, 권한 관련 작업
     */
    const authenticationResult = true;
    // const authenticationResult = false;

    Logger.log(`I'm test Guard`, TestGuard.name);
    return authenticationResult;
  }
}
