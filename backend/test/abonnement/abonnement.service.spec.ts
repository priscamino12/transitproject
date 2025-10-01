import { Test, TestingModule } from '@nestjs/testing';
import { AdminSystemeService } from '@/admin-systeme/admin-systeme.service';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from '@/admin-systeme/dto/create-admin.dto';
import { UpdateAdminDto } from '@/admin-systeme/dto/update-admin.dto';
import { LoginAdminDto } from '@/admin-systeme/dto/login-admin.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('$2b$10$hashedpassword'),
  compare: jest.fn(),
}));

describe('AdminSystemeService', () => {
  let service: AdminSystemeService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockAdmin = {
    idAdmin: 1,
    nomAdmin: 'Admin Test',
    emailAdmin: 'admin@test.com',
    motDePasse: '$2b$10$hashedpassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    adminSysteme: {
      create: jest.fn().mockResolvedValue(mockAdmin),
      findMany: jest.fn().mockResolvedValue([mockAdmin]),
      findUnique: jest.fn().mockResolvedValue(mockAdmin),
      update: jest.fn().mockResolvedValue(mockAdmin),
      delete: jest.fn().mockResolvedValue(undefined),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('jwt_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminSystemeService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AdminSystemeService>(AdminSystemeService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an admin successfully', async () => {
      const createAdminDto: CreateAdminDto = {
        nomAdmin: 'Admin Test',
        emailAdmin: 'admin@test.com',
        motDePasse: 'password123',
      };

      const result = await service.create(createAdminDto);
      expect(result).toEqual({
        success: true,
        message: 'Admin système créé avec succès',
        data: mockAdmin,
      });
      expect(prisma.adminSysteme.findUnique).toHaveBeenCalledWith({
        where: { emailAdmin: createAdminDto.emailAdmin },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(createAdminDto.motDePasse, 10);
      expect(prisma.adminSysteme.create).toHaveBeenCalledWith({
        data: {
          nomAdmin: createAdminDto.nomAdmin,
          emailAdmin: createAdminDto.emailAdmin,
          motDePasse: '$2b$10$hashedpassword',
        },
      });
    });

    it('should throw error if email already exists', async () => {
      const createAdminDto: CreateAdminDto = {
        nomAdmin: 'Admin Test',
        emailAdmin: 'admin@test.com',
        motDePasse: 'password123',
      };
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(mockAdmin);

      await expect(service.create(createAdminDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all admins', async () => {
      const result = await service.findAll();
      expect(result).toEqual({
        success: true,
        message: 'Admins système récupérés avec succès',
        data: [mockAdmin],
      });
      expect(prisma.adminSysteme.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an admin by ID', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual({
        success: true,
        message: 'Admin système récupéré avec succès',
        data: mockAdmin,
      });
      expect(prisma.adminSysteme.findUnique).toHaveBeenCalledWith({ where: { idAdmin: 1 } });
    });

    it('should throw error if admin not found', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an admin successfully', async () => {
      const updateAdminDto: UpdateAdminDto = {
        nomAdmin: 'Updated Admin',
        motDePasse: 'newpassword123',
      };

      const result = await service.update(1, updateAdminDto);
      expect(result).toEqual({
        success: true,
        message: 'Admin système mis à jour avec succès',
        data: mockAdmin,
      });
      expect(prisma.adminSysteme.findUnique).toHaveBeenCalledWith({ where: { idAdmin: 1 } });
      expect(bcrypt.hash).toHaveBeenCalledWith(updateAdminDto.motDePasse, 10);
      expect(prisma.adminSysteme.update).toHaveBeenCalledWith({
        where: { idAdmin: 1 },
        data: {
          nomAdmin: updateAdminDto.nomAdmin,
          motDePasse: '$2b$10$hashedpassword',
        },
      });
    });

    it('should throw error if admin not found', async () => {
      const updateAdminDto: UpdateAdminDto = { nomAdmin: 'Updated Admin' };
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);

      await expect(service.update(999, updateAdminDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete an admin successfully', async () => {
      const result = await service.remove(1);
      expect(result).toEqual({
        success: true,
        message: 'Admin système supprimé avec succès',
        data: null,
      });
      expect(prisma.adminSysteme.findUnique).toHaveBeenCalledWith({ where: { idAdmin: 1 } });
      expect(prisma.adminSysteme.delete).toHaveBeenCalledWith({ where: { idAdmin: 1 } });
    });

    it('should throw error if admin not found', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('login', () => {
    const loginAdminDto: LoginAdminDto = {
      emailAdmin: 'admin@test.com',
      motDePasse: 'password123',
    };
    const token = 'jwt_token';
    const adminData = {
      id: mockAdmin.idAdmin,
      nom: mockAdmin.nomAdmin,
      email: mockAdmin.emailAdmin,
    };

    it('should login successfully', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue(token);

      const result = await service.login(loginAdminDto);

      expect(prisma.adminSysteme.findUnique).toHaveBeenCalledWith({
        where: { emailAdmin: loginAdminDto.emailAdmin },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginAdminDto.motDePasse, mockAdmin.motDePasse);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockAdmin.idAdmin,
        email: mockAdmin.emailAdmin,
        role: 'ADMIN_SYSTEME',
      });
      expect(result).toEqual({
        success: true,
        message: 'Authentification réussie',
        data: { admin: adminData, token },
      });
    });

    it('should throw error if admin not found', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);

      await expect(service.login(loginAdminDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw error if password invalid', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginAdminDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
