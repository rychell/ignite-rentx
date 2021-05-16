import { hash } from "bcryptjs";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

export class user1621175932262 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const id = uuidV4();
    const password = await hash("admin", 8);
    await queryRunner.query(
      `INSERT INTO USERS(id, name, password, email, driver_license, "isAdmin", created_at)
       values ('${id}', 'admin', '${password}', 'admin@admin.com', '0000', true, 'now()')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM USERS WHERE email='admin@admin.com'`);
  }
}
