import { CreateTodoDto } from './dto/create-todo.dto';
import { Users } from 'src/user/entity/user.entity';
import { Todo } from './entity/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repository/todo.repository';
import { GetTodosDto, PaginationDto } from './dto/get-todo.dto';
export declare class TodoService {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    create(createTodoDto: CreateTodoDto, user: Users): Promise<Todo>;
    findAll(pagination: PaginationDto, user: Users, getTodosDto?: GetTodosDto): Promise<Todo[]>;
    update(id: string, updateTodoDto: UpdateTodoDto, user: Users): Promise<Todo>;
    remove(id: string, user: Users): Promise<Todo>;
    markAsComplete(id: string, user: Users): Promise<Todo>;
    markAsIncomplete(id: string, user: Users): Promise<Todo>;
}
