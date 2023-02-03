import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  async createUser(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      //to remove hash coz we don want it to send back to the client
      delete user.hash;

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email Already Taken taken');
        }
      }
      throw error;
    }
  }

  async loginUser(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new ForbiddenException('Email Not found');
      }

      const isPasswordMatch = await argon.verify(user.hash, dto.password);

      if (!isPasswordMatch) {
        throw new ForbiddenException('Incorect Password');
      }

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw error;
    }
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    const signToken = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('EXPIRES_JWT'),
      secret,
    });

    return { access_token: signToken };
  }
}
