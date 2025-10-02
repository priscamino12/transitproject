import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { ApiResponse } from '../types/api-response';
import { Employe } from '@prisma/client';

// Type personnalisé pour exclure motDePasse
type EmployeResponse = Omit<Employe, 'motDePasse'>;

@Controller('employe')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post()
  create(@Body() createEmployeDto: CreateEmployeDto): Promise<ApiResponse<EmployeResponse>> {
    return this.employeService.create(createEmployeDto);
  }

  @Get()
  findAll(): Promise<ApiResponse<EmployeResponse[]>> {
    return this.employeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<EmployeResponse>> {
    return this.employeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeDto: UpdateEmployeDto,
  ): Promise<ApiResponse<EmployeResponse>> {
    return this.employeService.update(id, updateEmployeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
    return this.employeService.remove(id);
  }
}