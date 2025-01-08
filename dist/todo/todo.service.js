"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const todo_repository_1 = require("./repository/todo.repository");
let TodoService = class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async create(createTodoDto, user) {
        const todo = this.todoRepository.create({ ...createTodoDto, user });
        return todo;
    }
    async findAll(pagination, user, getTodosDto) {
        console.log('td==', getTodosDto);
        console.log('user==', user);
        const { search, order, status } = getTodosDto;
        const { page, pageSize } = pagination;
        const query = await this.todoRepository.createQueryBuilder('todo');
        query.where('todo.userId = :userId', { userId: user.id });
        if (search) {
            query.andWhere('(todo.title LIKE :search OR todo.description LIKE :search)', { search: `%${search}%` });
        }
        if (status) {
            if (status === 'active') {
                query.andWhere('todo.isCompleted = :isCompleted', {
                    isCompleted: false,
                });
            }
            else if (status === 'inactive') {
                query.andWhere('todo.isCompleted = :isCompleted', {
                    isCompleted: true,
                });
            }
        }
        if (order &&
            (order.toUpperCase() === 'ASC' || order.toUpperCase() === 'DESC')) {
            query.orderBy('todo.dueDate', order);
        }
        query.skip((page - 1) * pageSize).take(pageSize);
        return await query.getMany();
    }
    async update(id, updateTodoDto, user) {
        console.log('id==', id, user.id);
        console.log('user', user);
        const verify = await this.todoRepository.findOne({ id }, { user: true });
        console.log(verify);
        if (verify?.user?.id !== user.id) {
            throw new common_1.UnauthorizedException('You do not have permission');
        }
        const todo = await this.todoRepository.findOneAndUpdate({ id }, updateTodoDto);
        return todo;
    }
    async remove(id, user) {
        const todo = await this.todoRepository.findOne({ id }, { user: true });
        if (todo && todo.user.id === user.id) {
            await this.todoRepository.delete({ id });
        }
        return todo;
    }
    async markAsComplete(id, user) {
        const todo = await this.todoRepository.findOne({ id }, { user: true });
        if (!todo) {
            throw new common_1.NotFoundException('Todo not found');
        }
        if (todo.user.id !== user.id) {
            throw new common_1.UnauthorizedException('You do not have permission');
        }
        todo.isCompleted = true;
        todo.dateCompleted = new Date().toISOString();
        return this.todoRepository.save(todo);
    }
    async markAsIncomplete(id, user) {
        const todo = await this.todoRepository.findOne({ id }, { user: true });
        if (!todo) {
            throw new common_1.NotFoundException('Todo not found');
        }
        if (todo.user.id !== user.id) {
            throw new common_1.UnauthorizedException('You do not have permission');
        }
        if (todo.dueDate && new Date(todo.dueDate) < new Date()) {
            throw new common_1.ConflictException('Cannot mark as incomplete as the due date has already passed');
        }
        todo.isCompleted = false;
        todo.dateCompleted = null;
        return this.todoRepository.save(todo);
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [todo_repository_1.TodoRepository])
], TodoService);
//# sourceMappingURL=todo.service.js.map