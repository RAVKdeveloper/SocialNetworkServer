import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { CommentsPhotoService } from './comments-photo.service';
import { CreateCommentsPhotoDto } from './dto/create-comments-photo.dto';
import { UpdateCommentsPhotoDto } from './dto/update-comments-photo.dto';
import { AuthGuard } from 'src/user/guards/local-auth.guard';

@Controller('comments-photo')
export class CommentsPhotoController {

  constructor(private readonly commentsPhotoService: CommentsPhotoService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommentsPhotoDto: CreateCommentsPhotoDto, @Request() request) {
    return this.commentsPhotoService.create(createCommentsPhotoDto, request.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentsPhotoService.getComments(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentsPhotoDto: UpdateCommentsPhotoDto) {
    return this.commentsPhotoService.update(+id, updateCommentsPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsPhotoService.remove(+id);
  }
}
