import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OptionsPostService } from './options-post.service';
import { OptionsPostController } from './options-post.controller';
import { WallPost } from '../create-post/entities/create-post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WallPost]),
    JwtModule.register({
      global: true,
      secret: 'secret123',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [OptionsPostController],
  providers: [OptionsPostService],
})
export class OptionsPostModule {}
