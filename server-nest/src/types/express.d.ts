import { User as UserModel } from '@prisma/client';

declare module 'express-session' {
  interface Session {
    returnTo?: string;
  }
}

declare global {
  namespace Express {
    //  Merge our Prisma User model with the existing Express.User interface.
    export interface User extends UserModel {}

    export interface Request {
      user?: User;
    }
  }
}
