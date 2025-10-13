import { Test, TestingModule } from '@nestjs/testing';
import { DureeAbonnementController } from './duree-abonnement.controller';

describe('DureeAbonnementController', () => {
  let controller: DureeAbonnementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DureeAbonnementController],
    }).compile();

    controller = module.get<DureeAbonnementController>(DureeAbonnementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
