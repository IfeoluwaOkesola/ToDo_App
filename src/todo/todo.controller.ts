import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetTodosDto, PaginationDto } from './dto/get-todo.dto';
import { Todo } from './entity/todo.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Users } from 'src/user/entity/user.entity';
import { NotFoundException } from '@nestjs/common';
import { GetUser } from 'src/shared/utils/decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
//import { AuthGuard } from '@nestjs/passport';

@ApiTags('Todos')
@ApiBearerAuth()
@Controller('/v1/todos')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Create a new Todo' })
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: Users,
  ): Promise<Todo> {
    return await this.todoService.create(createTodoDto, user);
  }

  @Get()
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Get all Todos for a user' })
  
  async findAll(
    @Query() pagination: PaginationDto,
    @GetUser() user: Users,
    @Query() getTodosDto?: GetTodosDto,
  ): Promise<Todo[]> {
    console.log('td==', getTodosDto, pagination);

    console.log('user==', user);
    return this.todoService.findAll(pagination, user, getTodosDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Update an existing Todo' })
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUser() user: Users,
  ): Promise<Todo> {
    const todo = await this.todoService.update(id, updateTodoDto, user);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  @Delete(':id')
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Delete a Todo' })
  async remove(@Param('id') id: string, @GetUser() user: Users): Promise<void> {
    await this.todoService.remove(id, user);
  }

  @Put(':id/complete')
  @UseGuards(AuthGuard) 
  @ApiOperation({ summary: 'Mark a Todo as completed' })
  async markAsComplete(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<Todo> {
    return await this.todoService.markAsComplete(id, user);
  }

  @Put(':id/in-complete')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Mark a Todo as in-complete' })
  async markAsInComplete(
    @Param('id') id: string,
    @GetUser() user: Users,
  ): Promise<Todo> {
    return await this.todoService.markAsIncomplete(id, user);
  }
}
