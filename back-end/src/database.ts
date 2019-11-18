import * as Knex from 'knex';
export class DatabaseConnection {
    private config = require('./knexfile');
    private knex: Knex = require('knex')(this.config);

    get db() {
        return this.knex;
    }
}