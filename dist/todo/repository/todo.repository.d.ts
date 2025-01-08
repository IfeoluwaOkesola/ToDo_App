import { BaseRepository } from 'src/shared/repository/base.repositpry';
import { EntityManager, Repository } from 'typeorm';
import { Todo } from '../entity/todo.entity';
export declare class TodoRepository extends BaseRepository<Todo> {
    private todoModel;
    private TodoRepo;
    private readonly entityManager;
    constructor(todoModel: Repository<Todo>, TodoRepo: Repository<Todo>, entityManager: EntityManager);
    save(data: Todo): Promise<Todo>;
}
