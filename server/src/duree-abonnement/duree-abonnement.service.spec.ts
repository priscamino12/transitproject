import { Test, TestingModule } from '@nestjs/testing';
import { DureeAbonnementService } from './duree-abonnement.service';

describe('DureeAbonnementService', () => {
  let service: DureeAbonnementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DureeAbonnementService],
    }).compile();

    service = module.get<DureeAbonnementService>(DureeAbonnementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
