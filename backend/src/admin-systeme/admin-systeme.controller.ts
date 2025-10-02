import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { AdminSystemeService } from './admin-systeme.service';
import { ApiResponse } from '../types/api-response';
import { AdminSysteme } from '@prisma/client';
import { CreateAdminSystemeDto } from './dto/create-admin-systeme.dto';
import { UpdateAdminSystemeDto } from './dto/update-admin-systeme.dto';

// Type personnalisé pour exclure motDePasse
type AdminSystemeResponse = Omit<AdminSysteme, 'motDePasse'>;

@Controller('admin-systeme')
export class AdminSystemeController {
  constructor(private readonly adminSystemeService: AdminSystemeService) {}

  @Post()
  create(@Body() createAdminSystemeDto: CreateAdminSystemeDto): Promise<ApiResponse<AdminSystemeResponse>> {
    return this.adminSystemeService.create(createAdminSystemeDto);
  }

  @Get()
  findAll(): Promise<ApiResponse<AdminSystemeResponse[]>> {
    return this.adminSystemeService.findAll();
  } 

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<AdminSystemeResponse>> {
    return this.adminSystemeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminSystemeDto: UpdateAdminSystemeDto,
  ): Promise<ApiResponse<AdminSystemeResponse>> {
    return this.adminSystemeService.update(id, updateAdminSystemeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
    return this.adminSystemeService.remove(id);
  }
}