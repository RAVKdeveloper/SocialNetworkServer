import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WallPostLikesService } from './wall-post-likes.service';
import { WallPostLikesController } from './wall-post-likes.controller';
import { WallPostLike } from './entities/wall-post-like.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ WallPostLike ]),
    JwtModule.register({
     global: true,
     secret: 'secret123',
     signOptions: { expiresIn: '30d' },
   }),
  ],
  controllers: [WallPostLikesController],
  providers: [WallPostLikesService],
})
export class WallPostLikesModule {}
