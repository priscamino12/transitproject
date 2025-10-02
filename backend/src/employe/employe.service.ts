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

}