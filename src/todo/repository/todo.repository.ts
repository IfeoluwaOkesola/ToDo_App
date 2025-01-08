import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/shared/repository/base.repositpry';
import { EntityManager, Repository } from 'typeorm';
import { Todo } from '../entity/todo.entity';

@Injectable()
export class TodoRepository extends BaseRepository<Todo> {
  constructor(
    @InjectRepository(Todo) private todoModel: Repository<Todo>,
    private TodoRepo: Repository<Todo>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(todoModel);
    this.TodoRepo = this.entityManager.getRepository(Todo);
  }

  async save(data: Todo) {
    return await this.TodoRepo.save(data);
  }
}
