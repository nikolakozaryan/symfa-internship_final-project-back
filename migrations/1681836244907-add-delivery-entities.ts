import type { MigrationInterface, QueryRunner } from "typeorm";

export class addDeliveryEntities1681836244907 implements MigrationInterface {
    name = 'addDeliveryEntities1681836244907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deliverymen" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "avatar" character varying NOT NULL, CONSTRAINT "PK_b76503a36d3ef3c70138566ea69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deliveries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deliveryDate" TIMESTAMP NOT NULL, "destination" character varying NOT NULL, "userId" uuid, "deliverymanId" uuid, CONSTRAINT "PK_a6ef225c5c5f0974e503bfb731f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_5c6fa91d8c68f8c3738ec5fe6cf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_f509ac1b8a4c230d6c685372609" FOREIGN KEY ("deliverymanId") REFERENCES "deliverymen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_f509ac1b8a4c230d6c685372609"`);
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_5c6fa91d8c68f8c3738ec5fe6cf"`);
        await queryRunner.query(`DROP TABLE "deliveries"`);
        await queryRunner.query(`DROP TABLE "deliverymen"`);
    }

}
