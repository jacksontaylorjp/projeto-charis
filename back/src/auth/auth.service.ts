import { Injectable, UnauthorizedException } from '@nestjs/common';
import admin from '../config/firebase.config';

@Injectable()
export class AuthService {
  async verifyToken(token: string): Promise<any> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
  }
}
