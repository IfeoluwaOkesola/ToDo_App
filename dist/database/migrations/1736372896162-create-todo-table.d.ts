import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateTodoTable1736372896162 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
