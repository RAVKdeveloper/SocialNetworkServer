import { Test, TestingModule } from '@nestjs/testing';
import { OptionsPostService } from './options-post.service';

describe('OptionsPostService', () => {
  let service: OptionsPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionsPostService],
    }).compile();

    service = module.get<OptionsPostService>(OptionsPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
