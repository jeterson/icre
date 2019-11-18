import { DatabaseConnection } from "../../database";


export class BackupRepository {
    conn = new DatabaseConnection();


    insert(obj: any) {
        return this.conn.db('backuplog').insert(obj);
    }

    findAll() {
        return this.conn.db('backuplog');
    }

    findLastBackup() {
        return this.conn.db.raw('select * from backuplog where data = (select max(data) from backuplog)')
    }

    alterConfig(cfg: any) {
        return this.conn.db('backupconfig').update(cfg);
    }

    getConfig() {
        return this.conn.db('backupconfig').first();
    }


}