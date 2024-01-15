import { Module, Search } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entitys/user.entity';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'kirill2008',
      database: 'SocialNetwork',
      entities: [User],
      synchronize: true,
    }),
     UserModule,
     SearchModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
