import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//? @Global() To make PrismaService available everywhere in your app without needing to import PrismaModule into every feature module.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
