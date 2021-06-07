// Update with your config settings.
const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';
module.exports = {

  development:  {
    client: 'postgresql',
    connection: {
      user: process.env.DB_USER, // e.g. 'my-user'
      password: process.env.DB_PASS, // e.g. 'my-user-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      host: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: 'migrations'
    }
  }

};
