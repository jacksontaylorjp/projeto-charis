import { Controller, Get, Post, Body, Param, UseGuards, UsePipes, ValidationPipe, Req, Put } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
import { CreateRegistrationDto } from './registration.dto';
import { Registration } from './registration.interface';

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

  @Put(':eventId/:registrationId')
  async update(
    @Param('eventId') eventId: string,
    @Param('registrationId') registrationId: string,
    @Body() registrationData: Partial<Registration>
  ) {
    return this.registrationService.update(eventId, registrationId, registrationData);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.registrationService.findOne(id);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.delete(id);
  // }
}
