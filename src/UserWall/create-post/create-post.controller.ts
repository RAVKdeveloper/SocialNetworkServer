import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';

import { CreatePostService } from './create-post.service';
import { CreateCreatePostDto } from './dto/create-create-post.dto';
import { UpdateCreatePostDto } from './dto/update-create-post.dto';
import { AuthGuard } from 'src/user/guards/local-auth.guard';
import { QueryPostDto } from './dto/query-post.dto';


@Controller('wall/post')
export class WallPostController {

  constructor(private readonly service: CreatePostService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateCreatePostDto, @Req() request) {
    return this.service.create(dto, request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
       destination: "./uploads/WallMedia/",
           filename: (req, file, cb) => {
               const name = file.originalname.split('.')[1]
               cb(null, `wallMedia${uuidv4()}.${name}`)
           }
    })
  }))
  uploadMedia(@Req() request, @UploadedFile() file, @Param('id') id: number) {
      return this.service.uploadMedia(request.user.sub, file.filename, id)
  } 

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: QueryPostDto, @Req() request) {
    return this.service.findAll(query, request.user.sub)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatePostDto: UpdateCreatePostDto) {
    return this.service.update(+id, updateCreatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    return this.service.remove(+id, request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete('media/:id')
  deleteMedia(@Param('id') id: number, @Req() request) {
     return this.service.deleteMedia(id, request.user.sub)
  }
}
