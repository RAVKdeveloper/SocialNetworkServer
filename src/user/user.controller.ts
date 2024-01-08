import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get()
    getUser(): any {
        return 'This User'
    }

    @Get(':id')
    getOne(@Param('id') id): string {
         return `User is ${id}`
    }
}
