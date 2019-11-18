//const { db } = require('./.env.ts');
import db from './env';

/*module.exports = {
	client: 'postgresql',
	connection: db,
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		extensions: 'ts',
		tableName: 'knex_migrations'
	}

};*/

module.exports = {
	client: 'sqlite3',
	connection: {
		filename: `${__dirname}/dev.sqlite3.db`,
	},
	useNullAsDefault: true,
	migrations: {
		extensions: 'ts',
		tableName: 'knex_migrations'
	}
}

// criar migrate
// knex migrate:make --knexfile ./src/knexfile.ts -x ts create_table_capture
