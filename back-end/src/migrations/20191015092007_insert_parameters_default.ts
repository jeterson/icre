import * as Knex from "knex";



const sqlDown = `
    delete from parametro where nome in 
    ('IDENTVARIAVELDOC', 'MASKCELDDDNONODIG', 'MASKCELDDD', 'MASKCELNONODIG', 'MASKCEL', 'MASKCNPJ', 'MASKCPF', 'PERMITEDOCUMENTODUPLICADO', 'CAPITALIZE')
`;

export async function up(knex: Knex): Promise<any> {
    return knex('parametro').insert([
        { nome: 'IDENTVARIAVELDOC', valor: '&', 'descricao': 'Prefixo identificador do documento do word' },
        { nome: 'CAPITALIZE', valor: 'S', 'descricao': 'Indica se irá capitalziar os nomes dos clientes na emissao do documento' },
        { nome: 'PERMITEDOCUMENTODUPLICADO', valor: 'S', descricao: 'Define se o sistema permitirá mais a duplicidade de rg e cpf' }
    ]);
}


export async function down(knex: Knex): Promise<any> {
    return knex.raw(sqlDown);
}

