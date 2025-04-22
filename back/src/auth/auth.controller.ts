import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('profile')
  @UseGuards(FirebaseAuthGuard)
  getProfile(@Req() req) {
    return req.user; 
  }
}
