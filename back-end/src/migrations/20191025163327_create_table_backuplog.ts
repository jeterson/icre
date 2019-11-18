import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('backuplog', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.date('data');
        table.string('status');
        table.text('log');
        table.boolean('manual');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('backuplog');
}

