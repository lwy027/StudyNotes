import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Permission } from './entities/permision.entity';
import { PermissionGuard } from '../permission.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Liweiye123456',
      database: 'acl_test',
      synchronize: true,
      logging: true,
      entities: [User, Permission],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PermissionGuard],
  exports: [UserService, PermissionGuard],
})
export class UserModule {}
