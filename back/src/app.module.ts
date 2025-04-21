import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PatientModule } from './registration/registration.module';
import { RegistrationController } from './registration/registration.controller';
import { RegistrationService } from './registration/registration.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    PatientModule,
  ],
  controllers: [AppController, RegistrationController],
  providers: [AppService, RegistrationService],
})
export class AppModule { }
