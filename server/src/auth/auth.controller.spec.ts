// src/auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { successResponse, errorResponse } from '../utils/response.utils';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    logout: jest.fn(),
  };

  const mockResponse = {
    json: jest.fn().mockReturnThis(), // Simule res.json et retourne l'objet pour chaînage
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            adminSysteme: { findUnique: jest.fn() },
            employe: { findUnique: jest.fn() },
            client: { findUnique: jest.fn() },
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call authService.login and return the result', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = successResponse('Connexion réussie', {
        id: 1,
        nom: 'Test',
        email: 'test@example.com',
        role: 'Admin',
        type: 'adminsysteme',
      });

      mockAuthService.login.mockResolvedValue(result);

      await controller.login(loginDto, mockResponse as any);

      expect(authService.login).toHaveBeenCalledWith(loginDto, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(result);
    });

    it('should handle login error', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      const error = errorResponse('Mot de passe incorrect.', null, 401);

      mockAuthService.login.mockResolvedValue(error);

      await controller.login(loginDto, mockResponse as any);

      expect(authService.login).toHaveBeenCalledWith(loginDto, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
  });

  describe('logout', () => {
    it('should call authService.logout and return the result', async () => {
      const result = successResponse('Déconnexion réussie.', null, 200);

      mockAuthService.logout.mockResolvedValue(result);

      await controller.logout(mockResponse as any);

      expect(authService.logout).toHaveBeenCalledWith(mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(result);
    });

    it('should handle logout error', async () => {
      const error = errorResponse('Erreur serveur lors de la déconnexion.', null, 500);

      mockAuthService.logout.mockResolvedValue(error);

      await controller.logout(mockResponse as any);

      expect(authService.logout).toHaveBeenCalledWith(mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
  });
});