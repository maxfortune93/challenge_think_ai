import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CatImageModule } from './cat-image/cat-image.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { ExtFileApiModule } from './ext-file-api/ext-file-api.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          ttl: 900 * 1000,
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || '6379'),
          },
        });
        return { store };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CatImageModule,
    AwsS3Module,
    ExtFileApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
