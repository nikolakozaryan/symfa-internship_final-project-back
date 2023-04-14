import type { MigrationInterface, QueryRunner } from "typeorm";

export class createOrderEntity1681481304960 implements MigrationInterface {
    name = 'createOrderEntity1681481304960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalPrice" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_dishes_dishes" ("ordersId" uuid NOT NULL, "dishesId" uuid NOT NULL, CONSTRAINT "PK_6dc77691381f13c4aa293019c53" PRIMARY KEY ("ordersId", "dishesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dce93c753018eae5d5eb6e579b" ON "orders_dishes_dishes" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd36a4c35feb3e23b4600c9082" ON "orders_dishes_dishes" ("dishesId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_dishes_dishes" ADD CONSTRAINT "FK_dce93c753018eae5d5eb6e579bb" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_dishes_dishes" ADD CONSTRAINT "FK_dd36a4c35feb3e23b4600c90820" FOREIGN KEY ("dishesId") REFERENCES "dishes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_dishes_dishes" DROP CONSTRAINT "FK_dd36a4c35feb3e23b4600c90820"`);
        await queryRunner.query(`ALTER TABLE "orders_dishes_dishes" DROP CONSTRAINT "FK_dce93c753018eae5d5eb6e579bb"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd36a4c35feb3e23b4600c9082"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dce93c753018eae5d5eb6e579b"`);
        await queryRunner.query(`DROP TABLE "orders_dishes_dishes"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
