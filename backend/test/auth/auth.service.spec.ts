import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@/auth/auth.service';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockResolvedValue('$2b$10$hashedpassword'),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockAdmin = {
    idAdmin: 1,
    nomAdmin: 'Admin Test',
    emailAdmin: 'admin@test.com',
    motDePasse: '$2b$10$hashedpassword',
    role: 'SuperAdmin',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockEmploye = {
    idEmploye: 2,
    nomEmploye: 'Employe Test',
    emailEmploye: 'employe@test.com',
    motDePasse: '$2b$10$hashedpassword',
    role: 'admin',
    idEntreprise: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockClient = {
    idClient: 3,
    nomClient: 'Client Test',
    emailClient: 'client@test.com',
    motDePasse: '$2b$10$hashedpassword',
    role: 'client',
    idEntreprise: 1,
    creerPar: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    adminSysteme: {
      findUnique: jest.fn(),
    },
    employe: {
      findUnique: jest.fn(),
    },
    client: {
      findUnique: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('jwt_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'admin@test.com',
      motDePasse: 'password123',
    };

    it('should login an AdminSysteme successfully and return user data', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('jwt_token');

      const result = await service.login(loginDto);

      expect(prisma.adminSysteme.findUnique).toHaveBeenCalledWith({
        where: { emailAdmin: loginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.motDePasse, mockAdmin.motDePasse);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockAdmin.idAdmin,
        email: mockAdmin.emailAdmin,
        role: mockAdmin.role,
      });
      expect(result).toEqual({
        response: {
          success: true,
          message: 'Authentification réussie',
          data: {
            user: {
              id: mockAdmin.idAdmin,
              nom: mockAdmin.nomAdmin,
              email: mockAdmin.emailAdmin,
              role: mockAdmin.role,
            },
          },
        },
        token: 'jwt_token',
      });
    });

    it('should login an Employe successfully and return user data', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);
      mockPrismaService.employe.findUnique.mockResolvedValue(mockEmploye);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('jwt_token');

      const result = await service.login({ ...loginDto, email: 'employe@test.com' });

      expect(prisma.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: 'employe@test.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.motDePasse, mockEmploye.motDePasse);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockEmploye.idEmploye,
        email: mockEmploye.emailEmploye,
        role: mockEmploye.role,
      });
      expect(result).toEqual({
        response: {
          success: true,
          message: 'Authentification réussie',
          data: {
            user: {
              id: mockEmploye.idEmploye,
              nom: mockEmploye.nomEmploye,
              email: mockEmploye.emailEmploye,
              role: mockEmploye.role,
            },
          },
        },
        token: 'jwt_token',
      });
    });

    it('should login a Client successfully and return user data', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);
      mockPrismaService.employe.findUnique.mockResolvedValue(null);
      mockPrismaService.client.findUnique.mockResolvedValue(mockClient);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('jwt_token');

      const result = await service.login({ ...loginDto, email: 'client@test.com' });

      expect(prisma.client.findUnique).toHaveBeenCalledWith({
        where: { emailClient: 'client@test.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.motDePasse, mockClient.motDePasse);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockClient.idClient,
        email: mockClient.emailClient,
        role: mockClient.role,
      });
      expect(result).toEqual({
        response: {
          success: true,
          message: 'Authentification réussie',
          data: {
            user: {
              id: mockClient.idClient,
              nom: mockClient.nomClient,
              email: mockClient.emailClient,
              role: mockClient.role,
            },
          },
        },
        token: 'jwt_token',
      });
    });

    it('should throw error if user not found', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);
      mockPrismaService.employe.findUnique.mockResolvedValue(null);
      mockPrismaService.client.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
      await expect(service.login(loginDto)).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Utilisateur non trouvé.',
          data: null,
        },
      });
    });

    it('should throw error if password is invalid', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
      await expect(service.login(loginDto)).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Mot de passe incorrect.',
          data: null,
        },
      });
    });

    it('should throw error if client has no password', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue(null);
      mockPrismaService.employe.findUnique.mockResolvedValue(null);
      mockPrismaService.client.findUnique.mockResolvedValue({ ...mockClient, motDePasse: null });

      await expect(service.login({ ...loginDto, email: 'client@test.com' })).rejects.toThrow(UnauthorizedException);
      await expect(service.login({ ...loginDto, email: 'client@test.com' })).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Aucun mot de passe défini pour cet utilisateur.',
          data: null,
        },
      });
    });

    it('should throw error if role is not defined', async () => {
      mockPrismaService.adminSysteme.findUnique.mockResolvedValue({ ...mockAdmin, role: undefined });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
      await expect(service.login(loginDto)).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Rôle de l\'utilisateur non défini.',
          data: null,
        },
      });
    });
  });
});