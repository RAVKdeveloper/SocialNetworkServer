import { Controller, Get, Post, Body, UseGuards, Res, Request } from '@nestjs/common';
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
}

