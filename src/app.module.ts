import { Module, Search } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entitys/user.entity';
import { PhotoUser } from './userphoto/entitys/photo.entity';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';
import { PhotoUserModule } from './userphoto/photo.module';
import { CommentsPhotoModule } from './comments-photo/comments-photo.module';
import { CommentsPhoto } from './comments-photo/entities/comments-photo.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'kirill2008',
      database: 'SocialNetwork',
      entities: [User, PhotoUser, CommentsPhoto],
      synchronize: true,
    }),
     UserModule,
     SearchModule,
     PhotoUserModule,
     CommentsPhotoModule,
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
