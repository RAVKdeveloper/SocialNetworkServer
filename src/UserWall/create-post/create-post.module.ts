import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreatePostService } from './create-post.service';
import { WallPostController } from './create-post.controller';
import { WallPost } from './entities/create-post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ WallPost ]),
    JwtModule.register({
     global: true,
     secret: 'secret123',
     signOptions: { expiresIn: '30d' },
   }),
  ],
  controllers: [WallPostController],
  providers: [CreatePostService],
})
export class WallPostModule {}
