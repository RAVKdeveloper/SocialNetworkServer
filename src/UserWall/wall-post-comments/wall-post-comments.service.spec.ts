import { Test, TestingModule } from '@nestjs/testing';
import { WallPostCommentsService } from './wall-post-comments.service';

describe('WallPostCommentsService', () => {
  let service: WallPostCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WallPostCommentsService],
    }).compile();

    service = module.get<WallPostCommentsService>(WallPostCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
