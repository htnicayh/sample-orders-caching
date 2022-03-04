const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialEntity1646412976736 {
    name = 'initialEntity1646412976736'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_type"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum" AS ENUM('furniture', 'kitchen')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_type" "public"."orders_order_type_enum" NOT NULL DEFAULT 'furniture'`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_status"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_order_status_enum" AS ENUM('pending', 'success', 'fail')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_status" "public"."orders_order_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_type"`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_type" character varying NOT NULL`);
    }
}
