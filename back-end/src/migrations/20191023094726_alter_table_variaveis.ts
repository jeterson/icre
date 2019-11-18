import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.alterTable('variaveis', (table: Knex.TableBuilder) => {
        table.string('propriedade');        
        
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.alterTable('variaveis', (table: Knex.TableBuilder) => {
        table.dropColumn('propriedade');
    })
}

