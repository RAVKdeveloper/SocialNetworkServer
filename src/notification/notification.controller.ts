import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/user/guards/local-auth.guard';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request) {
    return this.notificationService.findAll(request.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
