const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialEntity1646411092430 {
    name = 'initialEntity1646411092430'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "core_entity" ("id" SERIAL NOT NULL, CONSTRAINT "PK_c5cdb2ca7b19ec8fb2eeae76677" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "order_code" character varying NOT NULL, "order_type" character varying NOT NULL, "products" text array NOT NULL, "order_status" character varying NOT NULL, "quantity" integer NOT NULL, "total_price" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "product_code" character varying NOT NULL, "product_name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "core_entity"`);
    }
}
