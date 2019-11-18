import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('cliente', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('nome', 250).notNullable();
        table.string('unidade_consumidora');
        table.string('sexo', 1);
        table.string('estado_civil', 1);
        table.integer('banco').unsigned().index().references('id').inTable('banco');
        table.string('agencia');
        table.string('conta_corrente');
        table.string('telefone');
        table.string('celular');
        table.string('estado', 2).notNullable();
        table.string('endereco');
        table.integer('numero');
        table.string('bairro');
        table.string('cidade');
        table.string('cep');
        table.string('rede_pago_avista', 1);
        table.string('rede_financ_proj_luz_campo', 1);
        table.string('poste_concreto', 1);
        table.integer('ano_conclusao', 4);
        table.string('doacao_rede_ceron', 1);
        table.string('recibos', 1);
        table.string('notas_fiscais');
        table.string('juntar_copia_projeto_rede');
        table.date('data_cadastro');
        table.date('data_alteracao');
        table.date('data_exclusao');
        table.string('obs', 750);
        table.string('nome_usuario')
        table.string('orgao_expedidor');
        table.string('outro_documento');
        table.decimal('remunerar');
        table.string('rg');
        table.string('cpf');
        


    });
}


export async function down(knex: Knex): Promise<any> {
}

