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
  
}