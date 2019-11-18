import { DatabaseConnection } from '../../database';
import { Parametro } from '../model/parametros.model';

export class ParametroRepository {

    conn = new DatabaseConnection();

    findAll(descricao: string = '') {
        return this.conn.db('parametro').whereRaw('lower(descricao) like lower(?)', [`%${descricao}%`]);
    }

    findOne(name: string) {
        return this.conn.db('parametro').where({ nome: name }).first();
    }
    update(parametro: Parametro) {
        return this.conn.db('parametro').update(parametro).where({ nome: parametro.nome });
    }
}