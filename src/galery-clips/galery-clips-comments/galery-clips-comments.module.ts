import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GaleryClipsCommentsService } from './galery-clips-comments.service';
import { GaleryClipsCommentsController } from './galery-clips-comments.controller';
import { GaleryClipsComment } from './entities/galery-clips-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GaleryClipsComment]),
    JwtModule.register({
      global: true,
      secret: 'secret123',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [GaleryClipsCommentsController],
  providers: [GaleryClipsCommentsService],
})
export class GaleryClipsCommentsModule {}
