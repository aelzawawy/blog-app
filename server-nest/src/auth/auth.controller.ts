import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type Request, type Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    //* This function is never called.
    //* The @UseGuards decorator intercepts the request and redirects to Google.
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    //* The AuthGuard handles the Google callback.
    //* If successful, Passport establishes a session and attaches the user to the request.

    //* Get the original path to redirect to
    const returnTo = req.session.returnTo;

    req.logIn(req.user as any, (err) => {
      if (err) {
        return res.redirect('/auth/google');
      }

      delete req.session.returnTo;
      res.redirect(returnTo || '/');
    });
  }

  @Get('status')
  status(@Req() req: Request) {
    return { user: req.user ?? null };
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout!((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect('/');
    });
  }
}
