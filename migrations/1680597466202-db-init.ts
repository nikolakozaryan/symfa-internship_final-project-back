import type { MigrationInterface, QueryRunner } from "typeorm";

export class dbInit1680597466202 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createDatabase('food', true);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropDatabase('food', true);
  }

}
