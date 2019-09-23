const config = require('./src/config').configs;

const base = {
  client: 'postgresql',
  connection: {
    host: config.db.host,
    database: 'postgres',
    user: 'postgres',
    password: config.db.password,
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  },
  pool: {
    min: 2,
    max: 10,
  },
}

const migrations = {
  tableName: 'knex_migrations',
  onUpdateTrigger: table => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `
}

module.exports = {
  ...base,
  migrations
}
