import { Test, TestingModule } from '@nestjs/testing';
import { ModePaiementService } from './mode-paiement.service';

describe('ModePaiementService', () => {
  let service: ModePaiementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModePaiementService],
    }).compile();

    service = module.get<ModePaiementService>(ModePaiementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
