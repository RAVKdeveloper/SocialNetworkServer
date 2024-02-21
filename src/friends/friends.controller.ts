import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { AcceptFriendsDto } from './dto/accept-friend.dto';
import { AuthGuard } from 'src/user/guards/local-auth.guard';

@Controller('friends')
export class FriendsController {
  constructor(private readonly service: FriendsService) {}
  @UseGuards(AuthGuard)
  @Post()
  inviteFrind(@Body() dto: CreateFriendDto, @Req() request) {
    return this.service.create(dto, request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('accept')
  acceptFrient(@Body() dto: AcceptFriendsDto) {
    return this.service.accept(dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request) {
    return this.service.findAll(request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('preview')
  findPreview(@Req() request, @Query('limit') limit: number) {
    return this.service.findPreview(request.user.sub, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
