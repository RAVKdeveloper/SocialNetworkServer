import { Test, TestingModule } from '@nestjs/testing';
import { OptionsPostController } from './options-post.controller';
import { OptionsPostService } from './options-post.service';

describe('OptionsPostController', () => {
  let controller: OptionsPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionsPostController],
      providers: [OptionsPostService],
    }).compile();

    controller = module.get<OptionsPostController>(OptionsPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
