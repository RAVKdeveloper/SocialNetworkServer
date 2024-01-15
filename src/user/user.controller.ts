import { Controller, Get, Post, Body, UseGuards, Res, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import * as path from 'path'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { CheckPhoneDto } from './dto/check-phone.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/local-auth.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get()
    getUser() {
        return this.userService.getAll()
    }

    @UseGuards(AuthGuard)
    @Get('auth/me')
    me(@Request() request) {
        return this.userService.me(Number(request.user.sub))
    }

    @Post('auth/registr')
    registrationUser(@Body() CreateUserDTO: CreateUserDTO, @Res({ passthrough: true }) respones: Response) {
        return this.userService.registration(CreateUserDTO, respones)
    }

    @Post('auth/login')
    loginUser(@Body() LoginUserDto: LoginUserDto, @Res({ passthrough: true }) respones: Response) {
        return this.userService.login(LoginUserDto, respones)
    }

    @Post('/checkphone')
    checkPhone(@Body() CheckPhoneDto: CheckPhoneDto ) {
        return this.userService.checkPhone(CheckPhoneDto)
    }

    @Post('/avatar')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads/avatar",
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        })
    }))
    uploadAvatar() {
        return 'succes'
    }

    @Get('/addFiles')
    getFile(@Res() res, @Body() file: { filename: string }) {
         res.sendFile(path.join(__dirname, `../../uploads/avatar${file.filename}`))
        // res.json(file.filename)
    }
}

