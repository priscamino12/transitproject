import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class EmployeService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createEmployeDto: CreateEmployeDto) {

    const saltRounds = Number(this.configService.get('BCRYPT_SALT_ROUNDS') || 10);

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(createEmployeDto.motDePasse, saltRounds);

    // Créer l'utilisateur en DB (Prisma)
    const employe = await this.prisma.employe.create({
      data: {
        nomEmploye: createEmployeDto.nomEmploye,
        emailEmploye: createEmployeDto.emailEmploye,
        motDePasse: hashedPassword,
        typeEmploye: createEmployeDto.typeEmploye,
        // autres champs...
      },
    });

    // Retirer motDePasse avant de retourner (optionnel)
    // delete employe.motDePasse; // si tu veux
    return employe;
    return this.prisma.employe.create({
      data: createEmployeDto,
    });
  }

  async findAll() {
    return this.prisma.employe.findMany();
  }

  async findOne(id: number) {
    const employe = await this.prisma.employe.findUnique({
      where: { idEmploye: id },
    });
    if (!employe) {
      throw new NotFoundException(`Employé avec l'ID ${id} non trouvé`);
    }
    return employe;
  }

  async update(id: number, updateEmployeDto: UpdateEmployeDto) {
    const employe = await this.prisma.employe.findUnique({
      where: { idEmploye: id },
    });
    if (!employe) {
      throw new NotFoundException(`Employé avec l'ID ${id} non trouvé`);
    }
    return this.prisma.employe.update({
      where: { idEmploye: id },
      data: updateEmployeDto,
    });
  }

  async remove(id: number) {
    const employe = await this.prisma.employe.findUnique({
      where: { idEmploye: id },
    });
    if (!employe) {
      throw new NotFoundException(`Employé avec l'ID ${id} non trouvé`);
    }
    return this.prisma.employe.delete({
      where: { idEmploye: id },
    });
  }
}