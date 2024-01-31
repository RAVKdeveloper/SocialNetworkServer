import { Module } from '@nestjs/common';
import { GaleryClipsService } from './galery-clips.service';
import { GaleryClipsController } from './galery-clips.controller';

@Module({
  controllers: [GaleryClipsController],
  providers: [GaleryClipsService],
})
export class GaleryClipsModule {}
