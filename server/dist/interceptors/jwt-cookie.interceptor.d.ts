import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
export declare class JwtCookieInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): import("rxjs").Observable<any>;
}
