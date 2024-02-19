import { Test, TestingModule } from '@nestjs/testing';
import { WallPostCommentsController } from './wall-post-comments.controller';
import { WallPostCommentsService } from './wall-post-comments.service';

describe('WallPostCommentsController', () => {
  let controller: WallPostCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WallPostCommentsController],
      providers: [WallPostCommentsService],
    }).compile();

    controller = module.get<WallPostCommentsController>(
      WallPostCommentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
