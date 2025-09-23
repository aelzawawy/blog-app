import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.isAuthenticated()) {
      return true;
    }
    request.session.returnTo = request.originalUrl;
    const response = context.switchToHttp().getResponse();
    response.redirect('/auth/google');
    return false;
  }
}
