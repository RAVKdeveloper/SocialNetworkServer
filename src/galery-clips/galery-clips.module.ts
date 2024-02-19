import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GaleryClipsService } from './galery-clips.service';
import { GaleryClipsController } from './galery-clips.controller';
import { GaleryClip } from './entities/galery-clip.entity';
import { GaleryClipsCommentsModule } from './galery-clips-comments/galery-clips-comments.module';

@Module({
  controllers: [GaleryClipsController],
  providers: [GaleryClipsService],
  imports: [
    TypeOrmModule.forFeature([GaleryClip]),
    JwtModule.register({
      global: true,
      secret: 'secret123',
      signOptions: { expiresIn: '30d' },
    }),
    GaleryClipsCommentsModule,
  ],
})
export class GaleryClipsModule {}
