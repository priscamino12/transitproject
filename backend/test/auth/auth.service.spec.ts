import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@auth/auth.service';
import { PrismaService } from '@prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockPrismaService = {
    employe: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    const email = 'test@exemple.com';
    const password = 'password123';
    const hashedPassword = '$2b$10$somehashedpassword';
    const employe = {
      idEmploye: 1,
      emailEmploye: email,
      motDePasse: hashedPassword,
      typeEmploye: 'Employe',
    };
    const token = 'jwt_token';

    it('should return a JWT token when credentials are valid', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(employe);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue(token);

      const result = await authService.authenticate(email, password);

      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: employe.idEmploye,
        email: employe.emailEmploye,
        role: employe.typeEmploye,
      });
      expect(result).toBe(token); // Attendre une chaîne au lieu d'un objet
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(null);

      await expect(authService.authenticate(email, password)).rejects.toThrow(
        new UnauthorizedException('Identifiants invalides.'),
      );
      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: email },
      });
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(employe);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.authenticate(email, password)).rejects.toThrow(
        new UnauthorizedException('Identifiants invalides.'),
      );
      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });
});