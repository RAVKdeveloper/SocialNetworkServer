import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GaleryPhotoLikesService } from './galery-photo-likes.service';
import { GaleryPhotoLikesController } from './galery-photo-likes.controller';
import { GaleryPhotoLike } from './entities/galery-photo-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ GaleryPhotoLike ]),
    JwtModule.register({
     global: true,
     secret: 'secret123',
     signOptions: { expiresIn: '30d' },
   }),
  ],
  controllers: [GaleryPhotoLikesController],
  providers: [GaleryPhotoLikesService],
})
export class GaleryPhotoLikesModule {}
