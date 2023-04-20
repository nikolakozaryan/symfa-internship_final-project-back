import type { MigrationInterface, QueryRunner } from "typeorm";

export class addSocketidColumnToUser1681826151498 implements MigrationInterface {
    name = 'addSocketidColumnToUser1681826151498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "socketId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "socketId"`);
    }

}
