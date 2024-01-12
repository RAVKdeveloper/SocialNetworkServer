import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
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

    @Get(':id')
    getOne(@Param('id') id: string) {
         return this.userService.getById(+id)
    }

    @Post('auth/registr')
    registrationUser(@Body() CreateUserDTO: CreateUserDTO) {
        return this.userService.registration(CreateUserDTO)
    }

    @Post('auth/login')
    loginUser(@Body() LoginUserDto: LoginUserDto) {
        return this.userService.login(LoginUserDto)
    }

    @Post('/checkphone')
    checkPhone(@Body() CheckPhoneDto: CheckPhoneDto ) {
        return this.userService.checkPhone(CheckPhoneDto)
    }
}
