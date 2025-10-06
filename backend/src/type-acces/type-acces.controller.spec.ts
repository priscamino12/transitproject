import { Test, TestingModule } from '@nestjs/testing';
import { TypeAccesController } from './type-acces.controller';

describe('TypeAccesController', () => {
  let controller: TypeAccesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeAccesController],
    }).compile();

    controller = module.get<TypeAccesController>(TypeAccesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
