import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnTagToIngredient1694434600063 implements MigrationInterface {
    name = 'AddColumnTagToIngredient1694434600063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "tag" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "tag"`);
    }

}
