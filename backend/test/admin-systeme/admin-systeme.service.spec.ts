import { Test, TestingModule } from '@nestjs/testing';
import { AdminSystemeService } from '@/admin-systeme/admin-systeme.service';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AdminSysteme } from '@prisma/client';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('$2b$10$hashedpassword'),
}));

// Type personnalisé pour exclure motDePasse
type AdminSystemeResponse = Omit<AdminSysteme, 'motDePasse'>;

describe('AdminSystemeService', () => {
  let service: AdminSystemeService;
  let prisma: PrismaService;

  const mockAdmin: AdminSysteme = {
    idAdmin: 1,
    nomAdmin: 'Admin Test',
    emailAdmin: 'admin@test.com',
    motDePasse: '$2b$10$hashedpassword',
    role: 'SuperAdmin',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockAdminResponse: AdminSystemeResponse = {
    idAdmin: 1,
    nomAdmin: 'Admin Test',
    emailAdmin: 'admin@test.com',
    role: 'SuperAdmin',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    adminSysteme: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminSystemeService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AdminSystemeService>(AdminSystemeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an admin with hashed password', async () => {
      mockPrismaService.adminSysteme.create.mockResolvedValue(mockAdmin);
      const createAdminSystemeDto = {
        nomAdmin: 'Admin Test',
        emailAdmin: 'admin@test.com',
        motDePasse: 'password123',
        role: 'SuperAdmin',
      };

      const result = await service.create(createAdminSystemeDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(prisma.adminSysteme.create).toHaveBeenCalledWith({
        data: { ...createAdminSystemeDto, motDePasse: '$2b$10$hashedpassword' },
      });
      expect(result).toEqual({
        success: true,
        message: 'Admin système créé avec succès',
        data: mockAdminResponse,
      });
    });

    it('should handle creation error', async () => {
      mockPrismaService.adminSysteme.create.mockRejectedValue(new Error('Database error'));
      const createAdminSystemeDto = {
        nomAdmin: 'Admin Test',
        emailAdmin: 'admin@test.com',
        motDePasse: 'password123',
      };

      const result = await service.create(createAdminSystemeDto);

      expect(result).toEqual({
        success: false,
        message: 'Erreur lors de la création de l\'admin: Database error',
        data: null,
      });
    });
  });

  describe('findAll', () => {
    it('should return all admins without passwords', async () => {
      mockPrismaService.adminSysteme.findMany.mockResolvedValue([mockAdmin]);

      const result = await service.findAll();

      expect(prisma.adminSysteme.findMany).toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
        message: 'Admins récupérés avec succès',
        data: [mockAdminResponse],
      });
    });
  });

  describe('findOne', () => {
    it('should return an admin by id without password', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(mockAdmin);

      const result = await service.findOne(1);

      expect(prisma.adminSysteme.findUnique).toHaveBeenCalledWith({ where: { idAdmin: 1 } });
      expect(result).toEqual({
        success: true,
        message: 'Admin récupéré avec succès',
        data: mockAdminResponse,
      });
    });

    it('should return error if admin not found', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(result).toEqual({
        success: false,
        message: 'Admin non trouvé',
        data: null,
      });
    });
  });

  describe('update', () => {
    it('should update an admin with hashed password', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(mockAdmin);
      mockPrismaService.adminSysteme.update.mockResolvedValue({
        ...mockAdmin,
        nomAdmin: 'Updated Admin',
      });
      const updateAdminSystemeDto = { nomAdmin: 'Updated Admin', motDePasse: 'newpassword' };

      const result = await service.update(1, updateAdminSystemeDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 10);
      expect(prisma.adminSysteme.update).toHaveBeenCalledWith({
        where: { idAdmin: 1 },
        data: { nomAdmin: 'Updated Admin', motDePasse: '$2b$10$hashedpassword' },
      });
      expect(result).toEqual({
        success: true,
        message: 'Admin mis à jour avec succès',
        data: { ...mockAdminResponse, nomAdmin: 'Updated Admin' },
      });
    });

    it('should return error if admin not found', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);

      const result = await service.update(1, { nomAdmin: 'Updated Admin' });

      expect(result).toEqual({
        success: false,
        message: 'Admin non trouvé',
        data: null,
      });
    });
  });

  describe('remove', () => {
    it('should delete an admin', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(mockAdmin);
      mockPrismaService.adminSysteme.delete.mockResolvedValue(mockAdmin);

      const result = await service.remove(1);

      expect(prisma.adminSysteme.delete).toHaveBeenCalledWith({ where: { idAdmin: 1 } });
      expect(result).toEqual({
        success: true,
        message: 'Admin supprimé avec succès',
        data: null,
      });
    });

    it('should return error if admin not found', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);

      const result = await service.remove(1);

      expect(result).toEqual({
        success: false,
        message: 'Admin non trouvé',
        data: null,
      });
    });
  });
});