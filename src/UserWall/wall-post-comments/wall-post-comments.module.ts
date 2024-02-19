import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WallPostComment } from './entities/wall-post-comment.entity';
import { WallPostCommentsService } from './wall-post-comments.service';
import { WallPostCommentsController } from './wall-post-comments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WallPostComment]),
    JwtModule.register({
      global: true,
      secret: 'secret123',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [WallPostCommentsController],
  providers: [WallPostCommentsService],
})
export class WallPostCommentsModule {}
