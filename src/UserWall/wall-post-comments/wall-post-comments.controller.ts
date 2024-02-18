import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';

import { WallPostCommentsService } from './wall-post-comments.service';
import { CreateWallPostCommentDto } from './dto/create-wall-post-comment.dto';
import { UpdateWallPostCommentDto } from './dto/update-wall-post-comment.dto';
import { AuthGuard } from 'src/user/guards/local-auth.guard';

@Controller('wall/post-comments')
export class WallPostCommentsController {

  constructor(private readonly service: WallPostCommentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateWallPostCommentDto, @Req() request) {
    return this.service.create(dto, request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
       destination: "./uploads/WallMedia/comments",
           filename: (req, file, cb) => {
               const name = file.originalname.split('.')[1]
               cb(null, `wallMediaComments${uuidv4()}.${name}`)
           }
    })
  }))
  uploadImage(@Req() request, @UploadedFile() file: Express.Multer.File, @Param('id') id: number) {
      return this.service.uploadImage(request.user.sub, file.filename, id)
  } 

  @Get(':id')
  findOne(@Param('id') id: string, @Query('order') order: 'ASC' | 'DESC') {
    return this.service.findOne(+id, order);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWallPostCommentDto, @Req() request) {
    return this.service.update(+id, dto, request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    return this.service.remove(+id, request.user.sub);
  }
}
