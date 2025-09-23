import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreateUser(profile: any): Promise<User> {
    const email = profile.emails[0].value;

    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          googleId: profile.id,
          email,
          displayName: profile.displayName,
          picture: profile.photos[0].value,
        },
      });
    }

    return user;
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
