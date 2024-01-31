import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GaleryClipsService } from './galery-clips.service';
import { CreateGaleryClipDto } from './dto/create-galery-clip.dto';
import { UpdateGaleryClipDto } from './dto/update-galery-clip.dto';

@Controller('galery-clips')
export class GaleryClipsController {
  constructor(private readonly galeryClipsService: GaleryClipsService) {}

  @Post()
  create(@Body() createGaleryClipDto: CreateGaleryClipDto) {
    return this.galeryClipsService.create(createGaleryClipDto);
  }

  @Get()
  findAll() {
    return this.galeryClipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galeryClipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGaleryClipDto: UpdateGaleryClipDto) {
    return this.galeryClipsService.update(+id, updateGaleryClipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galeryClipsService.remove(+id);
  }
}
