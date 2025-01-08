"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeDateCompletedNullable1736374086234 = void 0;
class MakeDateCompletedNullable1736374086234 {
    constructor() {
        this.name = 'MakeDateCompletedNullable1736374086234';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "dateCompleted" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "dateCompleted" SET NOT NULL`);
    }
}
exports.MakeDateCompletedNullable1736374086234 = MakeDateCompletedNullable1736374086234;
//# sourceMappingURL=1736374086234-make-dateCompleted-nullable.js.map