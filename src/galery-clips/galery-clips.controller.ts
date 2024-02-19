import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Request,
  Put,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { GaleryClipsService } from './galery-clips.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/user/guards/local-auth.guard';
import { UpdateClipDto } from './dto/update-clip.dto';

@Controller('galery-clips')
export class GaleryClipsController {
  constructor(private readonly service: GaleryClipsService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('clip', {
      storage: diskStorage({
        destination: './uploads/userClips',
        filename: (req, file, cb) => {
          const type = file.originalname.split('.');
          cb(null, `clipUser${uuidv4()}.${type[1]}`);
        },
      }),
    }),
  )
  @Post()
  create(@UploadedFile() file, @Request() request) {
    return this.service.create(file.filename, request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('preview')
  getPreview(@Request() request) {
    return this.service.getPreview(request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() request) {
    return this.service.findAll(request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateClipDto) {
    return this.service.updateClip(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
