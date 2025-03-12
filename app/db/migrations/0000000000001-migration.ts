import { MigrationInterface, QueryRunner } from "typeorm";

export class migration0000000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";

        CREATE TYPE todo_status AS ENUM ('new', 'complete', 'progress', 'cancel');

        CREATE TABLE todos (
          todo_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          todo_status todo_status NOT NULL DEFAULT 'new',
          todo_title VARCHAR NOT NULL,
          todo_text VARCHAR NOT NULL,
          todo_note VARCHAR NOT NULL DEFAULT '',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        INSERT INTO todos (todo_title, todo_status, todo_text)
        VALUES
          ('Buy groceries', 'new', 'some text'),
          ('Walk the dog', 'complete', 'some text'),
          ('Read a book', 'progress', 'some text'),
          ('Finish homework', 'cancel', 'some text'),
          ('Clean the house', 'new', 'some text'),
          ('Prepare presentation', 'complete', 'some text'),
          ('Go for a run', 'progress', 'some text'),
          ('Call mom', 'cancel', 'some text'),
          ('Write blog post', 'new', 'some text'),
          ('Learn PostgreSQL', 'complete', 'some text'),
          ('Watch a movie', 'progress', 'some text'),
          ('Plan vacation', 'cancel', 'some text')
        ;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE todos;

      DROP TYPE todo_status;
    `);
  }
}
