import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { EntrepriseService } from './entreprise.service';
import { CreateEntrepriseDto, UpdateEntrepriseDto } from './entreprise.dto';
import { ApiResponse } from '../types/api-response';
import { Entreprise } from '@prisma/client';

@Controller('entreprise')
export class EntrepriseController {
  constructor(private readonly entrepriseService: EntrepriseService) {}

  @Post()
  create(@Body() createEntrepriseDto: CreateEntrepriseDto): Promise<ApiResponse<Entreprise>> {
    return this.entrepriseService.create(createEntrepriseDto);
  }

  @Get()
  findAll(): Promise<ApiResponse<Entreprise[]>> {
    return this.entrepriseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Entreprise>> {
    return this.entrepriseService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntrepriseDto: UpdateEntrepriseDto,
  ): Promise<ApiResponse<Entreprise>> {
    return this.entrepriseService.update(id, updateEntrepriseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
    return this.entrepriseService.remove(id);
  }
}
