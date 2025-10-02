import { Test, TestingModule } from '@nestjs/testing';
import { EmployeService } from '@/employe/employe.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('EmployeService', () => {
  let service: EmployeService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    employe: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'DATABASE_URL') {
        return 'postgresql://postgres:myLocalPassword123@localhost:5432/transit_db';
      }
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<EmployeService>(EmployeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});