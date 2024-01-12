import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./entitys/user.entity";


@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [
       TypeOrmModule.forFeature([ User ]),
       JwtModule.register({
        global: true,
        secret: 'secret123',
        signOptions: { expiresIn: '30d' },
      }),
    ]
})

export class UserModule{}