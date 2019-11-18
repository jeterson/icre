import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('parametro', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('nome');
        table.string('valor');
        table.string('descricao', 250);
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('parametro');
}

