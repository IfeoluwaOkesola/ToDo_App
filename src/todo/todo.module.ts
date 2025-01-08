import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Todo } from './entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from './repository/todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository, Repository],
  exports: [TodoRepository, TodoService],
})
export class TodoModule {}
