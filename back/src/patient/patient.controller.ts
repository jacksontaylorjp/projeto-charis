import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.interface';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async create(@Body() patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.patientService.create(patientData);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  async findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  async update(@Param('id') id: string, @Body() patientData: Partial<Patient>) {
    return this.patientService.update(id, patientData);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  async delete(@Param('id') id: string) {
    return this.patientService.delete(id);
  }
}
