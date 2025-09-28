import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Inject } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';

@Injectable()
export class BlogCacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const cacheKey = request.url;
    const ttl = 60000 * 5; 

    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      response.setHeader('X-Cache', 'HIT');
      return of(cachedData);
    }

    response.setHeader('X-Cache', 'MISS');
    return next.handle().pipe(
      tap(async (data) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          await this.cacheManager.set(cacheKey, data, ttl);
        }
      }),
    );
  }
}