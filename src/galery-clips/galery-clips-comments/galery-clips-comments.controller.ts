import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GaleryClipsCommentsService } from './galery-clips-comments.service';
import { CreateGaleryClipsCommentDto } from './dto/create-galery-clips-comment.dto';
import { AuthGuard } from 'src/user/guards/local-auth.guard';

@Controller('clips/galery-clips-comments')
export class GaleryClipsCommentsController {
  constructor(private readonly service: GaleryClipsCommentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateGaleryClipsCommentDto, @Request() request) {
    return this.service.create(dto, request.user.sub);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.service.findAll(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
