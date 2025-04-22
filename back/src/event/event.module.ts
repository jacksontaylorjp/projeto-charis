import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports:[AuthModule],
  controllers: [EventController],
  providers: [EventService, AuthService]
})
export class EventModule {}
