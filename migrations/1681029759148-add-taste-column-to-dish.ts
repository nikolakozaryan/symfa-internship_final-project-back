import type { MigrationInterface, QueryRunner } from "typeorm";

export class addTasteColumnToDish1681029759148 implements MigrationInterface {
    name = 'addTasteColumnToDish1681029759148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dishes" ADD "taste" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "taste"`);
    }

}
