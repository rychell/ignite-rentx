import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUsersTable1621902346833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "id",
      new TableColumn({
        name: "id",
        type: "uuid",
        isPrimary: true,
        isUnique: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "id",
      new TableColumn({
        name: "id",
        type: "uuid",
        isPrimary: false,
        isUnique: false
      })
    );
  }
}
