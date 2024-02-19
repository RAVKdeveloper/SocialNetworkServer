import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GaleryClipsLikesService } from './galery-clips-likes.service';
import { GaleryClipsLikesController } from './galery-clips-likes.controller';
import { GaleryClipsLike } from './entities/galery-clips-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GaleryClipsLike]),
    JwtModule.register({
      global: true,
      secret: 'secret123',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [GaleryClipsLikesController],
  providers: [GaleryClipsLikesService],
})
export class GaleryClipsLikesModule {}
