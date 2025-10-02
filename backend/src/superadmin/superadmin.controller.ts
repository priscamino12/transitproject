import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

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