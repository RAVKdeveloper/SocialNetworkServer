import { Test, TestingModule } from '@nestjs/testing';
import { WallPostLikesController } from './wall-post-likes.controller';
import { WallPostLikesService } from './wall-post-likes.service';

describe('WallPostLikesController', () => {
  let controller: WallPostLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WallPostLikesController],
      providers: [WallPostLikesService],
    }).compile();

    controller = module.get<WallPostLikesController>(WallPostLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
