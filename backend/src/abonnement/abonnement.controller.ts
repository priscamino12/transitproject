import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { AbonnementService } from './abonnement.service';
import { ApiResponse } from '../types/api-response';
import { Abonnement } from '@prisma/client';
import { CreateAbonnementDto, UpdateAbonnementDto } from './abonnement.dto';

@Controller('abonnement')
export class AbonnementController {
  constructor(private readonly abonnementService: AbonnementService) {}

//   @Post()
//   create(@Body() createAbonnementDto: CreateAbonnementDto): Promise<ApiResponse<Abonnement>> {
//     return this.abonnementService.create(createAbonnementDto);
//   }

  @Get()
  findAll(): Promise<ApiResponse<Abonnement[]>> {
    return this.abonnementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Abonnement>> {
    return this.abonnementService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAbonnementDto: UpdateAbonnementDto,
  ): Promise<ApiResponse<Abonnement>> {
    return this.abonnementService.update(id, updateAbonnementDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
    return this.abonnementService.remove(id);
  }
}