import { Test, TestingModule } from '@nestjs/testing';
import { GaleryClipsController } from './galery-clips.controller';
import { GaleryClipsService } from './galery-clips.service';

describe('GaleryClipsController', () => {
  let controller: GaleryClipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GaleryClipsController],
      providers: [GaleryClipsService],
    }).compile();

    controller = module.get<GaleryClipsController>(GaleryClipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
