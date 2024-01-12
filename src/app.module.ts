import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entitys/user.entity';


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
    })
    , UserModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}