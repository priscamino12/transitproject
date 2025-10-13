import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { AdminSystemeService } from './admin-systeme.service';
import { CreateAdminSystemeDto } from './dto/create-admin-systeme.dto';
import { UpdateAdminSystemeDto } from './dto/update-admin-systeme.dto';


@Controller('admin-systeme')
export class AdminSystemeController {
  constructor(private readonly adminSystemeService: AdminSystemeService) {}

  @Post()
  create(@Body() createAdminSystemeDto: CreateAdminSystemeDto) {
    return this.adminSystemeService.create(createAdminSystemeDto);
  }

  @Get()
  findAll() {
    return this.adminSystemeService.findAll();
  } 

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminSystemeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminSystemeDto: UpdateAdminSystemeDto,
  ) {
    return this.adminSystemeService.update(id, updateAdminSystemeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminSystemeService.remove(id);
  }
}