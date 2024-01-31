import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GaleryPhotoLikesService } from './galery-photo-likes.service';
import { AuthGuard } from 'src/user/guards/local-auth.guard';

@Controller('galery-photo-likes')
export class GaleryPhotoLikesController {
  constructor(private readonly galeryPhotoLikesService: GaleryPhotoLikesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body('photoId') photoId: string, @Request() request) {
    return this.galeryPhotoLikesService.create(request.user.sub, +photoId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') photoId: string, @Request() request) {
    console.log(photoId)
    return this.galeryPhotoLikesService.findOne(request.user.sub, +photoId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galeryPhotoLikesService.remove(+id);
  }
}
  