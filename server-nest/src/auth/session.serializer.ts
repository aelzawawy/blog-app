import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /*
    The method names serializeUser and deserializeUser are fixed. They are part of the contract
    required by Passport's PassportSerializer class, which our SessionSerializer extends.
  */

  //? This method is called only once when the user successfully logs in.
  serializeUser(
    user: User,
    done: (err: Error | null, id?: number) => void,
  ): void {
    //? We don't want to store the whole user object, so we choose just the user.id.
    done(null, user.id);
  }

  //? This method is called on every single authenticated request after the user has logged in.
  async deserializeUser(
    id: number,
    done: (err: Error | null, user?: User | null) => void,
  ): Promise<void> {
    const user = await this.authService.findUserById(id);
    done(null, user);
  }
}
