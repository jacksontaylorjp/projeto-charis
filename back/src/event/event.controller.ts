import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './event.dto';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    user: {
        uid: string;
        // ...other user properties if needed...
    };
}

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @UseGuards(FirebaseAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async create(@Body() eventData: CreateEventDto, @Req() req: AuthenticatedRequest) {
        const userId = req.user.uid;
        return this.eventService.create(eventData, userId);
    }
    //busca só os eventos que estão online
    @Get('on')
    async findOn() {
        return this.eventService.findOn();
    }
    //busca todos
    @UseGuards(FirebaseAuthGuard)
    @Get('all')
    async findAll() {
        return this.eventService.findAll();
    }
}
