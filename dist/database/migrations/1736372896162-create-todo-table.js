"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoTable1736372896162 = void 0;
class CreateTodoTable1736372896162 {
    constructor() {
        this.name = 'CreateTodoTable1736372896162';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "todos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "dueDate" date, "isCompleted" boolean NOT NULL DEFAULT false, "dateCompleted" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_4583be7753873b4ead956f040e3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_4583be7753873b4ead956f040e3"`);
        await queryRunner.query(`DROP TABLE "todos"`);
    }
}
exports.CreateTodoTable1736372896162 = CreateTodoTable1736372896162;
//# sourceMappingURL=1736372896162-create-todo-table.js.map