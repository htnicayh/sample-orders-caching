const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialEntity1646412825345 {
    name = 'initialEntity1646412825345'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum" AS ENUM('furniture', 'kitchen')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "order_code" character varying NOT NULL, "order_type" "public"."orders_order_type_enum" NOT NULL DEFAULT 'furniture', "products" text array NOT NULL, "order_status" character varying NOT NULL, "quantity" integer NOT NULL, "total_price" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "product_code" character varying NOT NULL, "product_name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_type"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_type" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_type"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_type" "public"."orders_order_type_enum" NOT NULL DEFAULT 'furniture'`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum"`);
    }
}
