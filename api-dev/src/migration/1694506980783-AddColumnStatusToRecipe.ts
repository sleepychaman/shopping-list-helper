import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnStatusToRecipe1694506980783 implements MigrationInterface {
    name = 'AddColumnStatusToRecipe1694506980783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "status" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "status"`);
    }

}
