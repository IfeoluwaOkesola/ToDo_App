import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Users } from 'src/user/entity/user.entity';
import { Todo } from './entity/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repository/todo.repository';
import { GetTodosDto, PaginationDto } from './dto/get-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async create(createTodoDto: CreateTodoDto, user: Users): Promise<Todo> {
    const todo = this.todoRepository.create({ ...createTodoDto, user });
    return todo;
  }

  async findAll(
    pagination: PaginationDto,
    user: Users,
    getTodosDto?: GetTodosDto,
  ): Promise<Todo[]> {
   
    const { search, order, status } = getTodosDto;

    const { page, pageSize } = pagination;

    const query = await this.todoRepository.createQueryBuilder('todo');

    
    query.where('todo.userId = :userId', { userId: user.id });


    if (search) {
      query.andWhere(
        '(todo.title LIKE :search OR todo.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      if (status === 'active') {
        query.andWhere('todo.isCompleted = :isCompleted', {
          isCompleted: false,
        });
      } else if (status === 'inactive') {
        query.andWhere('todo.isCompleted = :isCompleted', {
          isCompleted: true,
        });
      }
    }

    if (
      order &&
      (order.toUpperCase() === 'ASC' || order.toUpperCase() === 'DESC')
    ) {
      query.orderBy('todo.dueDate', order);
    }


    query.skip((page - 1) * pageSize).take(pageSize);

    return await query.getMany();
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
    user: Users,
  ): Promise<Todo> {
    
    const verify = await this.todoRepository.findOne({ id }, { user: true });

    
    if (verify?.user?.id !== user.id) {
      throw new UnauthorizedException('You do not have permission');
    }

    const todo = await this.todoRepository.findOneAndUpdate(
      { id },
      updateTodoDto,
    );

    return todo;
  }

  async remove(id: string, user: Users) {
    const todo = await this.todoRepository.findOne({ id }, { user: true });
    if (!todo) {
      throw new NotFoundException('Todo not found');
  }

  if (todo.user.id !== user.id) {
      throw new UnauthorizedException('You do not have permission to delete this todo');
  }

  await this.todoRepository.delete({ id });

  return { message: 'Todo successfully deleted', id };
  }

  async markAsComplete(id: string, user: Users): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ id }, { user: true });


    if (!todo) {
      throw new NotFoundException('Todo not found');
    }


    if (todo.user.id !== user.id) {
      throw new UnauthorizedException('You do not have permission');
    }

    todo.isCompleted = true;
    todo.dateCompleted = new Date().toISOString();
    return this.todoRepository.save(todo);
  }

  async markAsIncomplete(id: string, user: Users): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ id }, { user: true });


    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    
    if (todo.user.id !== user.id) {
      throw new UnauthorizedException('You do not have permission');
    }


    if (todo.dueDate && new Date(todo.dueDate) < new Date()) {
      throw new ConflictException(
        'Cannot mark as incomplete as the due date has already passed',
      );
    }

    todo.isCompleted = false;
    todo.dateCompleted = null; 

    return this.todoRepository.save(todo);
  }
}
