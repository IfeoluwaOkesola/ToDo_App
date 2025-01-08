import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { Users } from './entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService, UserRepository, Repository],
  exports: [UserRepository, UserService],
})
export class UserModule {}
