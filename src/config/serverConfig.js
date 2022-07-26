const config = {};

/** mongodb connection configuration */
const noSqlDbConfig = {
  url: process.env.DB_URL || 'mongodb://localhost:27017/',
  name: process.env.DB_NAME || 'myDB'
};

/** sql connection configuration */
const sqlDbConfig = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  dialect: process.env.DB_DIALECT || 'mysql',
  name: process.env.DB_NAME || 'myDB'
};

config.db = {
  noSqlDbConfig,
  sqlDbConfig
};

config.swaggerDefinition = {
  info: {
    title: process.env.APP_TITLE || 'Test Swagger Definition',
    description: '',
    version: process.env.APP_VERSION || '0.0.0'
  },
  host: process.env.APP_URL || 'localhost:8080',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json']
};

module.exports = config;
