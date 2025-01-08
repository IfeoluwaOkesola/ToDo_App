"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1736331860354 = void 0;
class CreateUserTable1736331860354 {
    constructor() {
        this.name = 'CreateUserTable1736331860354';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "fullname" character varying, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateUserTable1736331860354 = CreateUserTable1736331860354;
//# sourceMappingURL=1736331860354-create-user-table.js.map