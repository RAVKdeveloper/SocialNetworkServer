import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from 'src/user/guards/local-auth.guard';
import { GaleryClipsLikesService } from './galery-clips-likes.service';

@Controller('galery-clips-likes')
export class GaleryClipsLikesController {
  constructor(private readonly service: GaleryClipsLikesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() clipId: { clipId: number }, @Request() request) {
    return this.service.create(clipId.clipId, request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findAll(@Param('id') id: number, @Request() request) {
    return this.service.findAll(id, request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() request) {
    return this.service.remove(+id, request.user.sub);
  }
}
