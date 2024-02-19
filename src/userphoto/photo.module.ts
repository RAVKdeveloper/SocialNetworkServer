import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PhotoUserController } from './userphoto.controller';
import { PhotoUserService } from './userphoto.service';
import { PhotoUser } from './entitys/photo.entity';

@Module({
  providers: [PhotoUserService],
  controllers: [PhotoUserController],
  imports: [
    TypeOrmModule.forFeature([PhotoUser]),
    JwtModule.register({
      global: true,
      secret: 'secret123',
      signOptions: { expiresIn: '30d' },
    }),
  ],
})
export class PhotoUserModule {}
