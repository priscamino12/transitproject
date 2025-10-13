import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModePaiementService } from './mode-paiement.service';
import { CreateModePaiementDto } from './dto/create-mode-paiement.dto';
import { UpdateModePaiementDto } from './dto/update-mode-paiement.dto';

@Controller('mode-paiement')
export class ModePaiementController {
  constructor(private readonly modePaiementService: ModePaiementService) {}

  @Post()
  create(@Body() dto: CreateModePaiementDto) {
    return this.modePaiementService.create(dto);
  }

  @Get()
  findAll() {
    return this.modePaiementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modePaiementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateModePaiementDto) {
    return this.modePaiementService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modePaiementService.remove(+id);
  }
}