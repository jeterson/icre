import { DatabaseConnection } from "../../database";

export class VariaveisRepository {

    conn = new DatabaseConnection();

    findAll() {
        return this.conn.db('variaveis');
    }

    findOne(id: number) {
        return this.conn.db('variaveis').where({ id: id }).first();
    }

    update(obj: any) {
        return this.conn.db('variaveis').update(obj).where({ id: obj.id });
    }
}