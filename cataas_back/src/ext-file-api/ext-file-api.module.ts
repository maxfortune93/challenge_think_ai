import { Module } from '@nestjs/common';
import { ExtFileApiService } from './ext-file-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ExtFileApiService],
  exports: [ExtFileApiService],
})
export class ExtFileApiModule {}
