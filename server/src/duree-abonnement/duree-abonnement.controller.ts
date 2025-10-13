import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DureeAbonnementService } from './duree-abonnement.service';
import { CreateDureeAbonnementDto } from './dto/create-duree-abonnement.dto';
import { UpdateDureeAbonnementDto } from './dto/update-duree-abonnement.dto';

@Controller('duree-abonnement')
export class DureeAbonnementController {
    constructor(private readonly dureeAbonnementService: DureeAbonnementService) {}
    
      @Post()
      create(@Body() dto: CreateDureeAbonnementDto) {
        return this.dureeAbonnementService.create(dto);
      }
     
      @Get()
      findAll() {
        return this.dureeAbonnementService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.dureeAbonnementService.findOne(+id);
      }
    
      @Patch(':id')
      update(@Param('id') id: string, @Body() dto: UpdateDureeAbonnementDto) {
        return this.dureeAbonnementService.update(+id, dto);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.dureeAbonnementService.remove(+id);
      }
}
