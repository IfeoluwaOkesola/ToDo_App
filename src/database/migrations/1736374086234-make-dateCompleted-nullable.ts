import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeDateCompletedNullable1736374086234
  implements MigrationInterface
{
  name = 'MakeDateCompletedNullable1736374086234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" ALTER COLUMN "dateCompleted" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" ALTER COLUMN "dateCompleted" SET NOT NULL`,
    );
  }
}
