import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex('backupconfig').insert({
        automatico: true,
        periodicidade: 'DIARIO',
        diasemana: 3,
        horario: 1730
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex('backupconfig').delete();
}

