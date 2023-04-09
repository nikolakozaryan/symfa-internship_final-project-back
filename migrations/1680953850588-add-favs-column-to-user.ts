import type { MigrationInterface, QueryRunner } from "typeorm";

export class addFavsColumnToUser1680953850588 implements MigrationInterface {
    name = 'addFavsColumnToUser1680953850588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "favs" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "favs"`);
    }

}
