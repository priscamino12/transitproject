import { Test, TestingModule } from '@nestjs/testing';
import { ModePaiementController } from './mode-paiement.controller';

describe('ModePaiementController', () => {
  let controller: ModePaiementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModePaiementController],
    }).compile();

    controller = module.get<ModePaiementController>(ModePaiementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
