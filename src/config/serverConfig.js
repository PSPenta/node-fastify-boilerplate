const config = {};

config.swaggerDefinition = {
  info: {
    title: 'Node Fastify Boilerplate',
    description: '',
    version: '1.0.0'
  },
  host: process.env.APP_URL || 'localhost:8080',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json']
};

module.exports = config;
