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
import { GaleryPhotoLikesModule } from './galery-photo-likes/galery-photo-likes.module';
import { GaleryPhotoLike } from './galery-photo-likes/entities/galery-photo-like.entity';
import { GaleryClipsModule } from './galery-clips/galery-clips.module';
import { GaleryClip } from './galery-clips/entities/galery-clip.entity';
import { GaleryClipsLikesModule } from './galery-clips-likes/galery-clips-likes.module';
import { GaleryClipsLike } from './galery-clips-likes/entities/galery-clips-like.entity';
import { GaleryClipsComment } from './galery-clips/galery-clips-comments/entities/galery-clips-comment.entity';
import { WallPost } from './UserWall/create-post/entities/create-post.entity';
import { WallPostModule } from './UserWall/create-post/create-post.module';
import { WallPostLike } from './UserWall/wall-post-likes/entities/wall-post-like.entity';
import { WallPostLikesModule } from './UserWall/wall-post-likes/wall-post-likes.module';
import { OptionsPostModule } from './UserWall/options-post/options-post.module';
import { WallPostCommentsModule } from './UserWall/wall-post-comments/wall-post-comments.module';
import { WallPostComment } from './UserWall/wall-post-comments/entities/wall-post-comment.entity';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'kirill2008',
      database: 'SocialNetwork',
      entities: [
        User,
        PhotoUser,
        CommentsPhoto,
        GaleryPhotoLike,
        GaleryClip,
        GaleryClipsLike,
        GaleryClipsComment,
        WallPost,
        WallPostLike,
        WallPostComment,
      ],
      synchronize: true,
    }),
    UserModule,
    SearchModule,
    PhotoUserModule,
    CommentsPhotoModule,
    GaleryPhotoLikesModule,
    GaleryClipsModule,
    GaleryClipsLikesModule,
    WallPostModule,
    WallPostLikesModule,
    OptionsPostModule,
    WallPostCommentsModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
