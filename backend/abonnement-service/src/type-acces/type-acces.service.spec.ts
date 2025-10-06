import { Test, TestingModule } from '@nestjs/testing';
import { TypeAccesService } from './type-acces.service';

describe('TypeAccesService', () => {
  let service: TypeAccesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeAccesService],
    }).compile();

    service = module.get<TypeAccesService>(TypeAccesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
