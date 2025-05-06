import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não fornecido.');
    }

    const user = await this.authService.verifyToken(token);

    const allowedEmails = [
      "antoniomarquesfilhosdoreijc@gmail.com",
      "analuciapereirasantos40@gmail.com",
      "lemuselucas@gmail.com",
      "jacksontaylorjp@gmail.com",
    ];

    if (!allowedEmails.includes(user.email)) {
      throw new UnauthorizedException('Acesso não autorizado!.');
    }

    request.user = user;
    return true;
  }
}
