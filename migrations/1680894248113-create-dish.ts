import type { MigrationInterface, QueryRunner } from "typeorm";

export class createDish1680894248113 implements MigrationInterface {
    name = 'createDish1680894248113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product" character varying NOT NULL, "productName" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "price" double precision NOT NULL, "prepareTime" integer NOT NULL, "rating" double precision NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_f4748c8e8382ad34ef517520b7b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dishes"`);
    }

}
