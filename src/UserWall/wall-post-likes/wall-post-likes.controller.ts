import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WallPostLikesService } from './wall-post-likes.service';
import { AuthGuard } from 'src/user/guards/local-auth.guard';

@Controller('wall/post-likes')
export class WallPostLikesController {
  constructor(private readonly service: WallPostLikesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body('postId') postId: number, @Req() request) {
    return this.service.create(postId, request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    return this.service.remove(+id, request.user.sub);
  }
}
