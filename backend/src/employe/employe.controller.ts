import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UseFilters } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { EmployeValidationFilter } from '@/common/filters/employe-validation.filter';

@Controller('employe')
@UseFilters(EmployeValidationFilter)
export class EmployeController {
 
}