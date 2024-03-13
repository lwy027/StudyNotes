import { Module } from '@nestjs/common';
import { JwtController } from './jwt.controller';
import { JwtModule as jwt } from '@nestjs/jwt';
@Module({
  imports: [
    jwt.register({
      secret: 'liweiye',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [JwtController],
})
export class JwtModule {}
