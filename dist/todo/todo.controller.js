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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const create_todo_dto_1 = require("./dto/create-todo.dto");
const update_todo_dto_1 = require("./dto/update-todo.dto");
const get_todo_dto_1 = require("./dto/get-todo.dto");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../user/entity/user.entity");
const common_2 = require("@nestjs/common");
const decorator_1 = require("../shared/utils/decorator");
const auth_guard_1 = require("../shared/guards/auth.guard");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async create(createTodoDto, user) {
        return await this.todoService.create(createTodoDto, user);
    }
    async findAll(pagination, user, getTodosDto) {
        console.log('td==', getTodosDto, pagination);
        console.log('user==', user);
        return this.todoService.findAll(pagination, user, getTodosDto);
    }
    async update(id, updateTodoDto, user) {
        const todo = await this.todoService.update(id, updateTodoDto, user);
        if (!todo) {
            throw new common_2.NotFoundException('Todo not found');
        }
        return todo;
    }
    async remove(id, user) {
        await this.todoService.remove(id, user);
    }
    async markAsComplete(id, user) {
        return await this.todoService.markAsComplete(id, user);
    }
    async markAsInComplete(id, user) {
        return await this.todoService.markAsIncomplete(id, user);
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Todo' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto,
        user_entity_1.Users]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Todos for a user' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetUser)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_todo_dto_1.PaginationDto,
        user_entity_1.Users,
        get_todo_dto_1.GetTodosDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing Todo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_todo_dto_1.UpdateTodoDto,
        user_entity_1.Users]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Todo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.Users]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/complete'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a Todo as completed' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.Users]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "markAsComplete", null);
__decorate([
    (0, common_1.Put)(':id/in-complete'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a Todo as in-complete' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.Users]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "markAsInComplete", null);
exports.TodoController = TodoController = __decorate([
    (0, swagger_1.ApiTags)('Todos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/v1/todos'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map