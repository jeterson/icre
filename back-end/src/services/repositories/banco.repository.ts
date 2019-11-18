import { DatabaseConnection } from '../../database';
import { Banco } from '../model/banco.mode';
import { timingSafeEqual } from 'crypto';
export class BancoRepository {
    conn = new DatabaseConnection();

    insert(banco: Banco) {
        return this.conn.db('banco').insert(banco);
    }

    update(banco: Banco) {
        return this.conn.db('banco').update(banco).where({id: banco.id});
    }

    findOne(id: number) {
        return this.conn.db('banco').where({id: id}).first();
    }

    findAll(descricao: string = '') {
        return this.conn.db('banco').whereRaw('lower(descricao) like ?', [`%${descricao}%`])
    }
    delete(id: number) {
        return this.conn.db('banco').delete().where({id: id});
    }
}