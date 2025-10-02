import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@/auth/auth.service';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(undefined),
  }),
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
    verify: jest.fn(),
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
      nomEmploye: 'Test Employe',
    };
    const token = 'jwt_token';
    const user = {
      id: employe.idEmploye,
      email: employe.emailEmploye,
      role: employe.typeEmploye,
      nom: employe.nomEmploye,
    };

    it('should return a JWT token and user info when credentials are valid', async () => {
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
      expect(result).toEqual({
        success: true,
        message: 'Authentification réussie',
        data: { user, token },
      });
    });

    it('should throw UnauthorizedException with ApiResponse if user is not found', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(null);

      await expect(authService.authenticate(email, password)).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Vous ne faites pas partie de notre équipe.',
          data: null,
        },
      });
      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: email },
      });
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException with ApiResponse if password is invalid', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(employe);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.authenticate(email, password)).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Mot de passe incorrect.',
          data: null,
        },
      });
      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });

  describe('forgotPwd', () => {
    const email = 'test@exemple.com';
    const employe = {
      idEmploye: 1,
      emailEmploye: email,
      nomEmploye: 'Test Employe',
      typeEmploye: 'Employe',
    };
    const token = 'jwt_token';

    it('should generate and send a temporary code and return a token', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(employe);
      mockPrismaService.employe.update.mockResolvedValue(employe);
      mockJwtService.sign.mockReturnValue(token);
      (nodemailer.createTransport as jest.Mock).mockReturnValue({
        sendMail: jest.fn().mockResolvedValue(undefined),
      });

      const result = await authService.forgotPwd(email);

      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: email },
      });
      expect(prismaService.employe.update).toHaveBeenCalledWith({
        where: { emailEmploye: email },
        data: expect.objectContaining({
          codeTemp: expect.any(String),
          codeTempExpires: expect.any(Date),
        }),
      });
      expect(nodemailer.createTransport).toHaveBeenCalled();
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: employe.idEmploye,
        email: employe.emailEmploye,
      });
      expect(result).toEqual({
        success: true,
        message: 'Code temporaire envoyé avec succès.',
        data: { token },
      });
    });

    it('should throw BadRequestException with ApiResponse if user is not found', async () => {
      mockPrismaService.employe.findUnique.mockResolvedValue(null);

      await expect(authService.forgotPwd(email)).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Utilisateur non trouvé.',
          data: null,
        },
      });
      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: email },
      });
      expect(prismaService.employe.update).not.toHaveBeenCalled();
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });

  describe('resetPwd', () => {
    const email = 'test@exemple.com';
    const token = 'jwt_token';
    const newPassword = 'newPassword123';
    const codeTemp = '123456';
    const employe = {
      idEmploye: 1,
      emailEmploye: email,
      codeTemp,
      codeTempExpires: new Date(Date.now() + 10 * 60 * 1000),
      typeEmploye: 'Employe',
      nomEmploye: 'Test Employe',
    };

    it('should reset password and clear temporary code', async () => {
      mockJwtService.verify.mockReturnValue({ email });
      mockPrismaService.employe.findUnique.mockResolvedValue(employe);
      mockPrismaService.employe.update.mockResolvedValue(employe);
      (bcrypt.hash as jest.Mock).mockResolvedValue('$2b$10$newhashedpassword');

      const result = await authService.resetPwd(token, newPassword, email, codeTemp);

      expect(jwtService.verify).toHaveBeenCalledWith(token);
      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
      expect(prismaService.employe.update).toHaveBeenCalledWith({
        where: { emailEmploye: email },
        data: {
          motDePasse: '$2b$10$newhashedpassword',
          codeTemp: null,
          codeTempExpires: null,
        },
      });
      expect(result).toEqual({
        success: true,
        message: 'Mot de passe réinitialisé avec succès.',
        data: null,
      });
    });

    it('should throw UnauthorizedException with ApiResponse if token is invalid', async () => {
      mockJwtService.verify.mockReturnValue({ email: 'wrong@exemple.com' });

      await expect(authService.resetPwd(token, newPassword, email, codeTemp)).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Token invalide.',
          data: null,
        },
      });
      expect(jwtService.verify).toHaveBeenCalledWith(token);
      expect(prismaService.employe.findUnique).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException with ApiResponse if code is invalid', async () => {
      mockJwtService.verify.mockReturnValue({ email });
      mockPrismaService.employe.findUnique.mockResolvedValue({
        ...employe,
        codeTemp: 'wrongCode',
      });

      await expect(authService.resetPwd(token, newPassword, email, codeTemp)).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Code temporaire invalide.',
          data: null,
        },
      });
      expect(jwtService.verify).toHaveBeenCalledWith(token);
      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: email },
      });
    });

    it('should throw BadRequestException with ApiResponse if code is expired', async () => {
      mockJwtService.verify.mockReturnValue({ email });
      mockPrismaService.employe.findUnique.mockResolvedValue({
        ...employe,
        codeTempExpires: new Date(Date.now() - 10 * 60 * 1000),
      });

      await expect(authService.resetPwd(token, newPassword, email, codeTemp)).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Code temporaire expiré.',
          data: null,
        },
      });
      expect(jwtService.verify).toHaveBeenCalledWith(token);
      expect(prismaService.employe.findUnique).toHaveBeenCalledWith({
        where: { emailEmploye: email },
      });
    });

    it('should throw UnauthorizedException with ApiResponse if verification fails', async () => {
      mockJwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(authService.resetPwd(token, newPassword, email, codeTemp)).rejects.toMatchObject({
        response: {
          success: false,
          message: 'Réinitialisation impossible.',
          data: null,
        },
      });
      expect(jwtService.verify).toHaveBeenCalledWith(token);
    });
  });
});