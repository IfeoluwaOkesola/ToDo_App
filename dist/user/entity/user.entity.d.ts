import { Todo } from 'src/todo/entity/todo.entity';
import { BaseEntity } from 'typeorm';
export declare class Users extends BaseEntity {
    id: string;
    email: string;
    fullname: string;
    password: string;
    todos: Todo[];
    createdAt: Date;
    updatedAt: Date;
}
