import { Test, TestingModule } from '@nestjs/testing';
import { WallPostLikesService } from './wall-post-likes.service';

describe('WallPostLikesService', () => {
  let service: WallPostLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WallPostLikesService],
    }).compile();

    service = module.get<WallPostLikesService>(WallPostLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
