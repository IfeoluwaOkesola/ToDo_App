import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class MakeDateCompletedNullable1736374086234 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
