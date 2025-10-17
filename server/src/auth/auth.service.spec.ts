// src/auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { successResponse, errorResponse } from '../utils/response.utils';

// Mock des dépendances
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
  sign: jest.fn(),
};

const mockConfigService = {
  get: jest.fn(),
};

const mockResponse = {
  cookie: jest.fn(),
  clearCookie: jest.fn(),
};

// Mock du module bcrypt
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: any;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should successfully login an adminSysteme user', async () => {
      const hashedPassword = 'hashed_password'; // Simule un mot de passe haché
      const user = {
        idAdminSysteme: 1,
        emailAdminSysteme: 'test@example.com',
        motDePasse: hashedPassword,
        nomAdminSysteme: 'Admin Test',
        role: 'Admin',
      };

      prismaService.adminSysteme.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Mock bcrypt.compare
      mockJwtService.sign.mockReturnValue('mocked_token');
      mockConfigService.get.mockReturnValue('production');

      const result = await authService.login(loginDto, mockResponse);

      expect(prismaService.adminSysteme.findUnique).toHaveBeenCalledWith({
        where: { emailAdminSysteme: loginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, user.motDePasse);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: user.idAdminSysteme,
        email: user.emailAdminSysteme,
        role: user.role,
        type: 'adminsysteme',
      });
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        'mocked_token',
        expect.any(Object),
      );
      expect(result).toEqual(
        successResponse('Connexion réussie', {
          id: user.idAdminSysteme,
          nom: user.nomAdminSysteme,
          email: user.emailAdminSysteme,
          role: user.role,
          type: 'adminsysteme',
        }),
      );
    });

    it('should successfully login an employe user', async () => {
      const hashedPassword = 'hashed_password';
      const user = {
        idEmploye: 2,
        emailEmploye: 'test@example.com',
        motDePasse: hashedPassword,
        nomEmploye: 'Employe Test',
        role: 'Employee',
      };

      prismaService.adminSysteme.findUnique.mockResolvedValue(null);
      prismaService.employe.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('mocked_token');
      mockConfigService.get.mockReturnValue('production');

      const result = await authService.login(loginDto, mockResponse);

      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: loginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, user.motDePasse);
      expect(result).toEqual(
        successResponse('Connexion réussie', {
          id: user.idEmploye,
          nom: user.nomEmploye,
          email: user.emailEmploye,
          role: user.role,
          type: 'employe',
        }),
      );
    });

    it('should successfully login a client user', async () => {
      const hashedPassword = 'hashed_password';
      const user = {
        idClient: 3,
        emailClient: 'test@example.com',
        motDePasse: hashedPassword,
        nomClient: 'Client Test',
      };

      prismaService.adminSysteme.findUnique.mockResolvedValue(null);
      prismaService.employe.findUnique.mockResolvedValue(null);
      prismaService.client.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('mocked_token');
      mockConfigService.get.mockReturnValue('production');

      const result = await authService.login(loginDto, mockResponse);

      expect(prismaService.client.findUnique).toHaveBeenCalledWith({
        where: { emailClient: loginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, user.motDePasse);
      expect(result).toEqual(
        successResponse('Connexion réussie', {
          id: user.idClient,
          nom: user.nomClient,
          email: user.emailClient,
          role: 'SuperAdmin',
          type: 'client',
        }),
      );
    });

    it('should return error if user not found', async () => {
      prismaService.adminSysteme.findUnique.mockResolvedValue(null);
      prismaService.employe.findUnique.mockResolvedValue(null);
      prismaService.client.findUnique.mockResolvedValue(null);

      const result = await authService.login(loginDto, mockResponse);

      expect(result).toEqual(errorResponse('Utilisateur non trouvé.', null, 401));
      expect(mockResponse.cookie).not.toHaveBeenCalled();
    });

    it('should return error if password is incorrect', async () => {
      const user = {
        idAdminSysteme: 1,
        emailAdminSysteme: 'test@example.com',
        motDePasse: 'hashed_password',
        nomAdminSysteme: 'Admin Test',
        role: 'Admin',
      };

      prismaService.adminSysteme.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Mot de passe incorrect

      const result = await authService.login(loginDto, mockResponse);

      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, user.motDePasse);
      expect(result).toEqual(errorResponse('Mot de passe incorrect.', null, 401));
      expect(mockResponse.cookie).not.toHaveBeenCalled();
    });

    it('should return error if client has no password', async () => {
      const user = {
        idClient: 3,
        emailClient: 'test@example.com',
        nomClient: 'Client Test',
      };

      prismaService.adminSysteme.findUnique.mockResolvedValue(null);
      prismaService.employe.findUnique.mockResolvedValue(null);
      prismaService.client.findUnique.mockResolvedValue(user);

      const result = await authService.login(loginDto, mockResponse);

      expect(result).toEqual(errorResponse('Aucun mot de passe défini.', null, 401));
      expect(mockResponse.cookie).not.toHaveBeenCalled();
    });

    it('should handle server error', async () => {
      prismaService.adminSysteme.findUnique.mockRejectedValue(new Error('Database error'));

      const result = await authService.login(loginDto, mockResponse);

      expect(result).toEqual(errorResponse('Erreur lors de la connexion: Database error', null, 500));
    });
  });

  describe('logout', () => {
    it('should successfully logout', async () => {
      mockConfigService.get.mockReturnValue('production');

      const result = await authService.logout(mockResponse);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith(
        'access_token',
        expect.any(Object),
      );
      expect(result).toEqual(successResponse('Déconnexion réussie.', null, 200));
    });

    it('should handle server error during logout', async () => {
      mockResponse.clearCookie.mockImplementation(() => {
        throw new Error('Cookie error');
      });

      const result = await authService.logout(mockResponse);

      expect(result).toEqual(errorResponse('Erreur serveur lors de la déconnexion.'));
    });
  });
});