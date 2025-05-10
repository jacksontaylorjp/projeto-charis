import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RegistrationModule } from './registration/registration.module';
import { RegistrationController } from './registration/registration.controller';
import { RegistrationService } from './registration/registration.service';
import { EventModule } from './event/event.module';
import { EventService } from './event/event.service';
import { EventController } from './event/event.controller';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    RegistrationModule,
    EventModule,
  ],
  controllers: [AppController, RegistrationController, EventController],
  providers: [AppService, RegistrationService, EventService],
})
export class AppModule { }
