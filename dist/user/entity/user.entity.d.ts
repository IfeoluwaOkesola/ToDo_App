import { BaseEntity } from "typeorm";
export declare class Users extends BaseEntity {
    id: string;
    email: string;
    fullname: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
