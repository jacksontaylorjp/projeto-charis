import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { RegistrationController } from './registration.controller';

@Module({
    imports: [AuthModule],
    controllers: [RegistrationController],
    providers: [RegistrationService, AuthService]
})
export class PatientModule { }
