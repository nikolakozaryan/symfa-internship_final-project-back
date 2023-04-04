import type { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1680680253302 implements MigrationInterface {
    name = 'createUser1680680253302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "avatar" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
