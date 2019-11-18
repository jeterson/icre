import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('backupconfig', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.boolean('automatico');
        table.string('periodicidade');
        table.integer('diasemana');
        table.string('horario');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('backupconfig');
}

