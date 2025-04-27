import { Controller, Get, Post, Body, Param, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
import { CreateRegistrationDto } from './registration.dto';

@Controller('registrations')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() registrationData: CreateRegistrationDto, @Req() req: any) {
    return this.registrationService.create(registrationData);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('/:event')
  async findByEvent(@Param('event') event: string) {
    return this.registrationService.findByEvent(event);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.registrationService.findOne(id);
  // }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() registrationData: Partial<Registration>) {
  //   return this.registrationService.update(id, registrationData);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.delete(id);
  // }
}
