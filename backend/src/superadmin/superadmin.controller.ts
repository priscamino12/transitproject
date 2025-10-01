import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminSystemeService } from './admin-systeme.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin-systeme')
export class AdminSystemeController {
  constructor(private readonly adminSystemeService: AdminSystemeService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminSystemeService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminSystemeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminSystemeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminSystemeService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminSystemeService.remove(+id);
  }

  @Post('login')
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminSystemeService.login(loginAdminDto);
  }
}