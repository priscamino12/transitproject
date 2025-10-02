import { Test, TestingModule } from '@nestjs/testing';
import { AdminSystemeController } from './admin-systeme.controller';

describe('SuperadminController', () => {
  let controller: AdminSystemeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminSystemeController],
    }).compile();

    controller = module.get<AdminSystemeController>(AdminSystemeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
