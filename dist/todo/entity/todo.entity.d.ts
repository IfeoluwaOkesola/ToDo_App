import { Users } from 'src/user/entity/user.entity';
export declare class Todo {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
    dateCompleted: string;
    user: Users;
    createdAt: Date;
    updatedAt: Date;
}
