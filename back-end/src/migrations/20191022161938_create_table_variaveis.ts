import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('variaveis', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('chave');
        table.text('valor')
        table.string('descricao')
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('variaveis')
}

