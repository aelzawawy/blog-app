import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import axios from 'axios';
import { type Request, type Response } from 'express';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    //* This function is never called.
    //* The @UseGuards decorator intercepts the request and redirects to Google.
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    /*
     * The AuthGuard handles the Google callback.
     * If successful, Passport establishes a session and attaches the user to the request.
     */
    const returnTo = req.query.state as string;
    req.logIn(req.user as any, (err) => {
      const clientUrl = this.configService.get('CLIENT_URL');
      res.redirect(`${clientUrl}${returnTo || '/'}`);
    });
  }

  @Get('currUser')
  currUser(@Req() req: Request) {
    return { user: req.user ?? null };
  }

  @Get('profile-picture')
  async getProfilePicture(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    try {
      const imgRes = await axios.get(user.picture!, {
        responseType: 'stream',
      });
      res.set('Content-Type', imgRes.headers['content-type']);
      imgRes.data.pipe(res);
    } catch (error) {
      res.status(500).send('Failed to fetch profile picture.');
    }
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
