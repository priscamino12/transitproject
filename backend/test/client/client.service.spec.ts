import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '@/client/client.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateClientDto } from '@/client/dto/create-client.dto';
import { UpdateClientDto } from '@/client/dto/update-client.dto';

describe('ClientService', () => {
  let service: ClientService;
  let prisma: PrismaService;

  const mockClient = {
    idClient: 1,
    nomClient: 'John Doe',
    emailClient: 'john@example.com',
    telClient: '123456789',
    adresseClient: '123 Street',
    CINClient: 'CIN123',
    createdAt: new Date(),
    updatedAt: new Date(),
    creerPar: 2,
    modifierPar: null,
  };

  const mockPrismaService = {
    client: {
      create: jest.fn().mockResolvedValue(mockClient),
      findMany: jest.fn().mockResolvedValue([mockClient]),
      findUnique: jest.fn().mockResolvedValue(mockClient) as jest.Mock,
      update: jest.fn().mockResolvedValue(mockClient),
      delete: jest.fn().mockResolvedValue(undefined),
    },
    employe: {
      findUnique: jest.fn().mockResolvedValue({ idEmploye: 2, nomEmploye: 'Test Employee' }) as jest.Mock,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a client successfully', async () => {
      const createClientDto: CreateClientDto = {
        nomClient: 'John Doe',
        emailClient: 'john@example.com',
        telClient: '123456789',
        adresseClient: '123 Street',
        CINClient: 'CIN123',
        creerPar: 2,
      };

      const result = await service.create(createClientDto);
      expect(result).toEqual({
        success: true,
        message: 'Client créé avec succès',
        data: mockClient,
      });
      expect(prisma.employe.findUnique).toHaveBeenCalledWith({
        where: { idEmploye: createClientDto.creerPar },
      });
      expect(prisma.client.create).toHaveBeenCalledWith({
        data: {
          nomClient: createClientDto.nomClient,
          emailClient: createClientDto.emailClient,
          telClient: createClientDto.telClient,
          adresseClient: createClientDto.adresseClient,
          CINClient: createClientDto.CINClient,
          creerPar: createClientDto.creerPar,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      const result = await service.findAll();
      expect(result).toEqual({
        success: true,
        message: 'Clients retrieved successfully',
        data: [mockClient],
      });
      expect(prisma.client.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a client by ID', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual({
        success: true,
        message: 'Client retrieved successfully',
        data: mockClient,
      });
      expect(prisma.client.findUnique).toHaveBeenCalledWith({
        where: { idClient: 1 },
        include: { creator: { select: { nomEmploye: true } } },
      });
    });

    it('should return null if client not found', async () => {
      (prisma.client.findUnique as jest.Mock).mockResolvedValueOnce(null);
      const result = await service.findOne(999);
      expect(result).toEqual({
        success: false,
        message: 'Client with ID 999 not found',
        data: null,
      });
    });
  });

  describe('update', () => {
    it('should update a client successfully', async () => {
      const updateClientDto: UpdateClientDto = { nomClient: 'Jane Doe', modifierPar: 2 };
      const result = await service.update(1, updateClientDto);
      expect(result).toEqual({
        success: true,
        message: 'Client updated successfully',
        data: mockClient,
      });
      expect(prisma.client.findUnique).toHaveBeenCalledWith({
        where: { idClient: 1 },
      });
      expect(prisma.client.update).toHaveBeenCalledWith({
        where: { idClient: 1 },
        data: { nomClient: 'Jane Doe', modifierPar: 2 },
      });
    });

    it('should return null if client not found', async () => {
      (prisma.client.findUnique as jest.Mock).mockResolvedValueOnce(null);
      const updateClientDto: UpdateClientDto = { nomClient: 'Jane Doe', modifierPar: 2 };
      const result = await service.update(999, updateClientDto);
      expect(result).toEqual({
        success: false,
        message: 'Client with ID 999 not found',
        data: null,
      });
    });
  });

  describe('remove', () => {
    it('should delete a client successfully', async () => {
      const result = await service.remove(1);
      expect(result).toEqual({
        success: true,
        message: 'Client deleted successfully',
        data: null,
      });
      expect(prisma.client.findUnique).toHaveBeenCalledWith({ where: { idClient: 1 } });
      expect(prisma.client.delete).toHaveBeenCalledWith({ where: { idClient: 1 } });
    });

    it('should return null if client not found', async () => {
      (prisma.client.findUnique as jest.Mock).mockResolvedValueOnce(null);
      const result = await service.remove(999);
      expect(result).toEqual({
        success: false,
        message: 'Client with ID 999 not found',
        data: null,
      });
    });
  });
});
