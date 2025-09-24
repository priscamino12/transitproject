import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('employe')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Admin'])
  create(@Body() createEmployeDto: CreateEmployeDto) {
    return this.employeService.create(createEmployeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.employeService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Admin'])
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeDto: UpdateEmployeDto) {
    return this.employeService.update(id, updateEmployeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Admin'])
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeService.remove(id);
  }
}