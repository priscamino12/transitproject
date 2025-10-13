import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeAccesService } from './type-acces.service';
import { CreateTypeAccesDto } from './dto/create-type-acces.dto';
import { UpdateTypeAccesDto } from './dto/update-type-acces.dto';

@Controller('type-acces')
export class TypeAccesController {
  constructor(private readonly typeAccesService: TypeAccesService) {}

  @Post()
  create(@Body() dto: CreateTypeAccesDto) {
    return this.typeAccesService.create(dto);
  }

  @Get()
  findAll() {
    return this.typeAccesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeAccesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTypeAccesDto) {
    return this.typeAccesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeAccesService.remove(+id);
  }
}