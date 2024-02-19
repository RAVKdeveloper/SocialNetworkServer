import { Test, TestingModule } from '@nestjs/testing';
import { GaleryClipsLikesController } from './galery-clips-likes.controller';
import { GaleryClipsLikesService } from './galery-clips-likes.service';

describe('GaleryClipsLikesController', () => {
  let controller: GaleryClipsLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GaleryClipsLikesController],
      providers: [GaleryClipsLikesService],
    }).compile();

    controller = module.get<GaleryClipsLikesController>(
      GaleryClipsLikesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
