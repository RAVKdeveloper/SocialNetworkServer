import { Controller, Get, Post, Body, UseGuards, Res, Request, UseInterceptors, UploadedFile, Delete, Param } from '@nestjs/common';
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid';
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

    @UseGuards(AuthGuard)
    @Post('/avatar')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./uploads/avatar",
            filename: (req, file, cb) => {
                cb(null, `${uuidv4()}.${file.mimetype.substring(6)}`)
            }
        })
    }))
    uploadAvatar(@Request() request, @UploadedFile() file) {
        return this.userService.uploadAvatar({ file, id: request.user.sub })
    }

    @UseGuards(AuthGuard)
    @Delete('/avatar/:id')
    deleteAvatar(@Param('id') id: string) {
        return this.userService.deleteAvatar(id)
    }

    @Get('/addFiles')
    getFile(@Res() res, @Body() file: { filename: string }) {
         res.sendFile(path.join(__dirname, `../../uploads/avatar${file.filename}`))
    }
}

