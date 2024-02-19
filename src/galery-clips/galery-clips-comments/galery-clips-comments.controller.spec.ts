import { Test, TestingModule } from '@nestjs/testing';
import { GaleryClipsCommentsController } from './galery-clips-comments.controller';
import { GaleryClipsCommentsService } from './galery-clips-comments.service';

describe('GaleryClipsCommentsController', () => {
  let controller: GaleryClipsCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GaleryClipsCommentsController],
      providers: [GaleryClipsCommentsService],
    }).compile();

    controller = module.get<GaleryClipsCommentsController>(
      GaleryClipsCommentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
