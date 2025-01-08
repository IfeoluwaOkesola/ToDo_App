import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodosDto, PaginationDto } from './dto/get-todo.dto';
import { Todo } from './entity/todo.entity';
import { Users } from 'src/user/entity/user.entity';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    create(createTodoDto: CreateTodoDto, user: Users): Promise<Todo>;
    findAll(pagination: PaginationDto, user: Users, getTodosDto?: GetTodosDto): Promise<Todo[]>;
    update(id: string, updateTodoDto: UpdateTodoDto, user: Users): Promise<Todo>;
    remove(id: string, user: Users): Promise<void>;
    markAsComplete(id: string, user: Users): Promise<Todo>;
    markAsInComplete(id: string, user: Users): Promise<Todo>;
}
