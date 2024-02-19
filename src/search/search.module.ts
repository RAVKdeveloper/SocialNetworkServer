import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entitys/user.entity';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  providers: [SearchService],
  controllers: [SearchController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'secret123',
      signOptions: { expiresIn: '30d' },
    }),
  ],
})
export class SearchModule {}
