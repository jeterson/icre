import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('banco', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('descricao');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('banco');
}

