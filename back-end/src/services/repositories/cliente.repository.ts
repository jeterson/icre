import { DatabaseConnection } from "../../database";
import { Cliente } from "../model/cliente.model";

export class ClienteRepository {

    conn = new DatabaseConnection();

    transform(cliente: Cliente) {
        const obj = {
            id: cliente.id,
            nome: cliente.nome,
            unidade_consumidora: cliente.unidadeConsumidora,
            sexo: cliente.sexo,
            estado_civil: cliente.estadoCivil,
            banco: cliente.banco,
            agencia: cliente.agencia,
            conta_corrente: cliente.contaCorrente,
            telefone: cliente.telefone,
            celular: cliente.celular,
            estado: cliente.estado,
            endereco: cliente.endereco,
            numero: cliente.numero,
            bairro: cliente.bairro,
            cidade: cliente.cidade,
            cep: cliente.cep,
            rede_pago_avista: cliente.redePagoAvista,
            rede_financ_proj_luz_campo: cliente.redeFinancProjLuzCampo,
            poste_concreto: cliente.posteConcreto,
            ano_conclusao: cliente.anoConclusao,
            doacao_rede_ceron: cliente.doacaoRedeCeron,
            recibos: cliente.recibos,
            notas_fiscais: cliente.notas_fiscais,
            juntar_copia_projeto_rede: cliente.juntar_copia_projeto_rede,
            data_cadastro: cliente.dataCadastro,
            data_alteracao: cliente.dataAlteracao,
            data_exclusao: cliente.dataExclusao,
            nome_usuario: cliente.nomeUsuario,
            orgao_expedidor: cliente.orgaoExpedidor,
            outro_documento: cliente.outroDocumendo,
            remunerar: cliente.remunerar,
            rg: cliente.rg,
            cpf: cliente.cpf
        }

        return obj;
    }

    insert(cliente: Cliente) {
        delete cliente.id;
        cliente.dataCadastro = new Date();
        const obj = this.transform(cliente);
        return this.conn.db('cliente').insert(obj);
    }
    update(cliente: Cliente) {
        cliente.dataAlteracao = new Date();
        const obj = this.transform(cliente);
        return this.conn.db('cliente').update(obj).where({ id: cliente.id });
    }

    delete(id: number) {
        return this.conn.db('cliente').update({ 'data_exclusao': new Date() }).where({ id: id });
    }

    findOne(id: number) {
        return this.conn.db('cliente').where({ id: id }).first();
    }

    findByCPF(cpf: string) {
        return this.conn.db('cliente').where({cpf: cpf}).first();
    }
    findByRG(rg: string) {
        return this.conn.db('cliente').where({rg: rg}).first();
    }

    findAll(params: any) {
        return this.conn.db('cliente').select('c.*', 'b.descricao').from('cliente as c')
            .join('banco as b', 'b.id', 'c.banco')
            .whereRaw('lower(nome) like lower(?)', [`%${params.nome}%`])
            .whereRaw('lower(unidade_consumidora) like ?', [`%${params.uc}%`])
            .whereRaw('lower(rg) like ?', [`%${params.rg}%`])
            .whereRaw('lower(cpf) like ?', [`%${params.cpf}%`])
            .whereRaw('lower(estado) like ?', [`%${params.uf}%`])
            .whereRaw('lower(cidade) like lower(?)', [`%${params.cidade}%`])
            .whereRaw('c.id like (?)', [`%${params.id}%`])
    }

    findByUc(uc: string) {
        return this.conn.db('cliente').select('unidade_consumidora').whereRaw('lower(unidade_consumidora) like ?', [`${uc}%`])
    }


}