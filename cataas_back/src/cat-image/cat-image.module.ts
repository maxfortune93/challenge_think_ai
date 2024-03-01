import { Module } from '@nestjs/common';
import { CatImageService } from './cat-image.service';
import { CatImageController } from './cat-image.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { ExtFileApiModule } from 'src/ext-file-api/ext-file-api.module';

@Module({
  imports: [HttpModule, AwsS3Module, ExtFileApiModule],
  controllers: [CatImageController],
  providers: [CatImageService, PrismaService],
})
export class CatImageModule {}
