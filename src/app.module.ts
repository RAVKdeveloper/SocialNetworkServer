import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';

const DB_URL = 'mongodb+srv://shcherbakovkirill2:kirill2008@cluster0.6al4nhi.mongodb.net/?retryWrites=true&w=majority'

@Module({
  imports: [MongooseModule.forRoot(DB_URL)],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
