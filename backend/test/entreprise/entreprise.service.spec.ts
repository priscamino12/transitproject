import { Test, TestingModule } from '@nestjs/testing';
import { EntrepriseService } from '@/entreprise/entreprise.service';
import { PrismaService } from '@/prisma/prisma.service';
import { StatusAbonnement } from '@prisma/client';

describe('EntrepriseService', () => {
  let service: EntrepriseService;
  let prisma: PrismaService;

  const mockEntreprise = {
    idEntreprise: 1,
    nomEntreprise: 'Entreprise Test',
    logoEntreprise: 'http://example.com/logo.png',
    adresseEntreprise: '123 Rue Test',
    nif: 'NIF123456',
    statJuridique: 'SARL',
    typeAccesId: 1,
    statusAbonnement: StatusAbonnement.ACTIF, // Utiliser l'enum
    dateDebutAbonnement: new Date('2025-01-01'),
    dateFinAbonnement: new Date('2025-12-31'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTypeAcces = {
    id: 1,
    nom: 'PREMIUM',
    prixBase: 100.0,
  };

  const mockPrismaService = {
    entreprise: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    typeAcces: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntrepriseService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<EntrepriseService>(EntrepriseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an entreprise', async () => {
      mockPrismaService.typeAcces.findUnique.mockResolvedValue(mockTypeAcces);
      mockPrismaService.entreprise.create.mockResolvedValue(mockEntreprise);
      const createEntrepriseDto = {
        nomEntreprise: 'Entreprise Test',
        logoEntreprise: 'http://example.com/logo.png',
        adresseEntreprise: '123 Rue Test',
        nif: 'NIF123456',
        statJuridique: 'SARL',
        typeAccesId: 1,
        statusAbonnement: StatusAbonnement.ACTIF, // Utiliser l'enum
        dateDebutAbonnement: '2025-01-01',
        dateFinAbonnement: '2025-12-31',
      };

      const result = await service.create(createEntrepriseDto);

      expect(prisma.typeAcces.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(prisma.entreprise.create).toHaveBeenCalledWith({ data: createEntrepriseDto });
      expect(result).toEqual({
        success: true,
        message: 'Entreprise créée avec succès',
        data: mockEntreprise,
      });
    });

    it('should return error if typeAcces not found', async () => {
      mockPrismaService.typeAcces.findUnique.mockResolvedValue(null);
      const createEntrepriseDto = {
        nomEntreprise: 'Entreprise Test',
        nif: 'NIF123456',
        typeAccesId: 1,
      };

      const result = await service.create(createEntrepriseDto);

      expect(result).toEqual({
        success: false,
        message: 'Type d\'accès non trouvé',
        data: null,
      });
    });
  });

  describe('findAll', () => {
    it('should return all entreprises', async () => {
      mockPrismaService.entreprise.findMany.mockResolvedValue([mockEntreprise]);

      const result = await service.findAll();

      expect(prisma.entreprise.findMany).toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
        message: 'Entreprises récupérées avec succès',
        data: [mockEntreprise],
      });
    });
  });

  describe('findOne', () => {
    it('should return an entreprise by id', async () => {
      mockPrismaService.entreprise.findUnique.mockResolvedValue(mockEntreprise);

      const result = await service.findOne(1);

      expect(prisma.entreprise.findUnique).toHaveBeenCalledWith({ where: { idEntreprise: 1 } });
      expect(result).toEqual({
        success: true,
        message: 'Entreprise récupérée avec succès',
        data: mockEntreprise,
      });
    });

    it('should return error if entreprise not found', async () => {
      mockPrismaService.entreprise.findUnique.mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(result).toEqual({
        success: false,
        message: 'Entreprise non trouvée',
        data: null,
      });
    });
  });

  describe('update', () => {
    it('should update an entreprise', async () => {
      mockPrismaService.entreprise.findUnique.mockResolvedValue(mockEntreprise);
      mockPrismaService.typeAcces.findUnique.mockResolvedValue(mockTypeAcces);
      mockPrismaService.entreprise.update.mockResolvedValue({ ...mockEntreprise, nomEntreprise: 'Updated Test' });
      const updateEntrepriseDto = { nomEntreprise: 'Updated Test', typeAccesId: 1 };

      const result = await service.update(1, updateEntrepriseDto);

      expect(prisma.entreprise.update).toHaveBeenCalledWith({
        where: { idEntreprise: 1 },
        data: updateEntrepriseDto,
      });
      expect(result).toEqual({
        success: true,
        message: 'Entreprise mise à jour avec succès',
        data: { ...mockEntreprise, nomEntreprise: 'Updated Test' },
      });
    });

    it('should return error if entreprise not found', async () => {
      mockPrismaService.entreprise.findUnique.mockResolvedValue(null);

      const result = await service.update(1, { nomEntreprise: 'Updated Test' });

      expect(result).toEqual({
        success: false,
        message: 'Entreprise non trouvée',
        data: null,
      });
    });

    it('should return error if typeAcces not found', async () => {
      mockPrismaService.entreprise.findUnique.mockResolvedValue(mockEntreprise);
      mockPrismaService.typeAcces.findUnique.mockResolvedValue(null);
      const updateEntrepriseDto = { typeAccesId: 2 };

      const result = await service.update(1, updateEntrepriseDto);

      expect(result).toEqual({
        success: false,
        message: 'Type d\'accès non trouvé',
        data: null,
      });
    });
  });

  describe('remove', () => {
    it('should delete an entreprise', async () => {
      mockPrismaService.entreprise.findUnique.mockResolvedValue(mockEntreprise);
      mockPrismaService.entreprise.delete.mockResolvedValue(mockEntreprise);

      const result = await service.remove(1);

      expect(prisma.entreprise.delete).toHaveBeenCalledWith({ where: { idEntreprise: 1 } });
      expect(result).toEqual({
        success: true,
        message: 'Entreprise supprimée avec succès',
        data: null,
      });
    });

    it('should return error if entreprise not found', async () => {
      mockPrismaService.entreprise.findUnique.mockResolvedValue(null);

      const result = await service.remove(1);

      expect(result).toEqual({
        success: false,
        message: 'Entreprise non trouvée',
        data: null,
      });
    });
  });
});
