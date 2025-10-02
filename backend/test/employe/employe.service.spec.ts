import { Test, TestingModule } from '@nestjs/testing';
import { EmployeService } from '@/employe/employe.service';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Employe } from '@prisma/client';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('$2b$10$hashedpassword'),
}));

// Type personnalisé pour exclure motDePasse
type EmployeResponse = Omit<Employe, 'motDePasse'>;

describe('EmployeService', () => {
  let service: EmployeService;
  let prisma: PrismaService;

  const mockEmploye: Employe = {
    idEmploye: 1,
    nomEmploye: 'Employe Test',
    emailEmploye: 'employe@test.com',
    motDePasse: '$2b$10$hashedpassword',
    role: 'admin',
    idEntreprise: 1,
    codeTemp: 'temp123',
    codeTempExpires: new Date('2025-10-02'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockEmployeResponse: EmployeResponse = {
    idEmploye: 1,
    nomEmploye: 'Employe Test',
    emailEmploye: 'employe@test.com',
    role: 'admin',
    idEntreprise: 1,
    codeTemp: 'temp123',
    codeTempExpires: new Date('2025-10-02'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockEntreprise = {
    idEntreprise: 1,
    nomEntreprise: 'Entreprise Test',
  };

  const mockPrismaService = {
    entreprise: {
      findUnique: jest.fn(),
    },
    employe: {
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
        EmployeService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<EmployeService>(EmployeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an employe with hashed password', async () => {
      mockPrismaService.entreprise.findUnique.mockResolvedValue(mockEntreprise);
      mockPrismaService.employe.create.mockResolvedValue(mockEmploye);
      const createEmployeDto = {
        nomEmploye: 'Employe Test',
        emailEmploye: 'employe@test.com',
        motDePasse: 'password123',
        role: 'admin',
        idEntreprise: 1,
        codeTemp: 'temp123',
        codeTempExpires: '2025-10-02',
      };

      const result = await service.create(createEmployeDto);

      expect(prisma.entreprise.findUnique).toHaveBeenCalledWith({ where: { idEntreprise: 1 } });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(prisma.employe.create).toHaveBeenCalledWith({
        data: { ...createEmployeDto, motDePasse: '$2b$10$hashedpassword' },
      });
      expect(result).toEqual({
        success: true,
        message: 'Employé créé avec succès',
        data: mockEmployeResponse,
      });
    });

    it('should return error if entreprise not found', async () => {
      mockPrismaService.entreprise.findUnique.mockResolvedValue(null);
      const createEmployeDto = {
        nomEmploye: 'Employe Test',
        emailEmploye: 'employe@test.com',
        motDePasse: 'password123',
        idEntreprise: 1,
      };

      const result = await service.create(createEmployeDto);

      expect(result).toEqual({
        success: false,
        message: 'Entreprise non trouvée',
        data: null,
      });
    });
  });

  describe('findAll', () => {
    it('should return all employes without passwords', async () => {
      mockPrismaService.employe.findMany.mockResolvedValue([mockEmploye]);

      const result = await service.findAll();

      expect(prisma.employe.findMany).toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
        message: 'Employés récupérés avec succès',
        data: [mockEmployeResponse],
      });
    });
  });

  describe('findOne', () => {
    it('should return an employe by id without password', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(mockEmploye);

      const result = await service.findOne(1);

      expect(prisma.employe.findUnique).toHaveBeenCalledWith({ where: { idEmploye: 1 } });
      expect(result).toEqual({
        success: true,
        message: 'Employé récupéré avec succès',
        data: mockEmployeResponse,
      });
    });

    it('should return error if employe not found', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(result).toEqual({
        success: false,
        message: 'Employé non trouvé',
        data: null,
      });
    });
  });

  describe('update', () => {
    it('should update an employe with hashed password', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(mockEmploye);
      mockPrismaService.entreprise.findUnique.mockResolvedValue(mockEntreprise);
      mockPrismaService.employe.update.mockResolvedValue({ ...mockEmploye, nomEmploye: 'Updated Employe' });
      const updateEmployeDto = { nomEmploye: 'Updated Employe', motDePasse: 'newpassword', idEntreprise: 1 };

      const result = await service.update(1, updateEmployeDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 10);
      expect(prisma.employe.update).toHaveBeenCalledWith({
        where: { idEmploye: 1 },
        data: { nomEmploye: 'Updated Employe', motDePasse: '$2b$10$hashedpassword', idEntreprise: 1 },
      });
      expect(result).toEqual({
        success: true,
        message: 'Employé mis à jour avec succès',
        data: { ...mockEmployeResponse, nomEmploye: 'Updated Employe' },
      });
    });

    it('should return error if employe not found', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(null);

      const result = await service.update(1, { nomEmploye: 'Updated Employe' });

      expect(result).toEqual({
        success: false,
        message: 'Employé non trouvé',
        data: null,
      });
    });

    it('should return error if entreprise not found', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(mockEmploye);
      mockPrismaService.entreprise.findUnique.mockResolvedValue(null);
      const updateEmployeDto = { idEntreprise: 2 };

      const result = await service.update(1, updateEmployeDto);

      expect(result).toEqual({
        success: false,
        message: 'Entreprise non trouvée',
        data: null,
      });
    });
  });

  describe('remove', () => {
    it('should delete an employe', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(mockEmploye);
      mockPrismaService.employe.delete.mockResolvedValue(mockEmploye);

      const result = await service.remove(1);

      expect(prisma.employe.delete).toHaveBeenCalledWith({ where: { idEmploye: 1 } });
      expect(result).toEqual({
        success: true,
        message: 'Employé supprimé avec succès',
        data: null,
      });
    });

    it('should return error if employe not found', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(null);

      const result = await service.remove(1);

      expect(result).toEqual({
        success: false,
        message: 'Employé non trouvé',
        data: null,
      });
    });
  });
});