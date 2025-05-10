import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { RegistrationController } from './registration.controller';
import { EventModule } from 'src/event/event.module';
import { EventService } from 'src/event/event.service';

@Module({
    imports: [AuthModule, RegistrationModule, EventModule],
    controllers: [RegistrationController],
    providers: [RegistrationService, AuthService, EventService]
})
export class RegistrationModule { }
