import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsPhotoService } from './comments-photo.service';
import { CommentsPhotoController } from './comments-photo.controller';
import { CommentsPhoto } from './entities/comments-photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ CommentsPhoto ]),
    JwtModule.register({
     global: true,
     secret: 'secret123',
     signOptions: { expiresIn: '30d' },
   }),
  ],
  controllers: [CommentsPhotoController],
  providers: [CommentsPhotoService],
})
export class CommentsPhotoModule {}
