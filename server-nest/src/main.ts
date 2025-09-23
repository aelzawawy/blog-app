import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RedisStore } from 'connect-redis';
import session from 'express-session';
import passport from 'passport';
import { createClient } from 'redis';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sess:',
  });

  app.use(
    session({
      store: redisStore,
      secret: configService.get<string>('COOKIE_KEY')!,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
