const environment = process.env.NODE_ENV || 'development';

const config = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost:5432/analytics',
    migrations: {
      directory: `${__dirname}/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/database/seeds`,
    },
  },
  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}`,
    migrations: {
      directory: `${__dirname}/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/database/seeds`,
    },
  },
};

module.exports = config;
