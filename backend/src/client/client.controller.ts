import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, UsePipes, ValidationPipe, UseFilters, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiResponse } from '../types/api-response';
import { Client } from '@prisma/client';
import { ClientValidationFilter } from '../common/filters/client-validation.filter';

@Controller('clients')
@UseGuards(JwtAuthGuard)
@UseFilters(ClientValidationFilter)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createClientDto: CreateClientDto): Promise<ApiResponse<Client>> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll(): Promise<ApiResponse<Client[]>> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Client>> {
    return this.clientService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ApiResponse<Client>> {
    return this.clientService.update(id, updateClientDto); // À ajuster si update doit aussi inclure modifierPar dans le DTO
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
    return this.clientService.remove(id);
  }
}