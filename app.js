/** Require the framework and instantiate it */
const fastify = require('fastify')({ logger: true });
require('dotenv').config();

const { swaggerDefinition } = require('./src/config/serverConfig');
const { response } = require('./src/helpers/utils');

/**
 * @name @fastify/helmet
 * @description This middleware helps in securing Fastify app by setting various HTTP headers.
 * Set some special response headers using helmet
 * For further information: https://www.npmjs.com/package/@fastify/helmet
 */
fastify.register(require('@fastify/helmet'));

/**
 * @name @fastify/compress
 * @description This middleware will compress the assets
 * which are to be sent in the response of server.
 * Compress the assets to be sent in response
 * For further information: https://www.npmjs.com/package/@fastify/compress
 */
fastify.register(require('@fastify/compress'));

/**
 * @name status-monitoring
 * @description This middleware will report realtime server metrics for Fastify-based node servers.
 * Set the routes for info and alive parameters for the server stats and server health checks.
 * For further information: https://www.npmjs.com/package/fastify-status
 */
fastify.register(require('fastify-status'), { info: '/api/status' });

/**
 * @name @fastify/cors
 * @description This middleware will handle all the cors setting for our app.
 * This middleware can be used to enable CORS with various options.
 * For further information: https://www.npmjs.com/package/@fastify/cors
 */
fastify.register(require('@fastify/cors'), { origin: process.env.CLIENT_URL || '*' });

/**
 * @name @fastify/rate-limit
 * @description This middleware will add the rate limiting functionality to the fastify app.
 * Enabling rate limiting will help us prevent the DOS attacks on our app.
 * For further information: https://www.npmjs.com/package/@fastify/rate-limit
 */
fastify.register(
  require('@fastify/rate-limit'),
  {
    max: 100,
    timeWindow: 1000 * 1
  }
);

/**
 * @name @fastify/swagger
 * @description This is used for API documentation. It's not mandatory.
 * For further information: https://www.npmjs.com/package/@fastify/swagger
 */
fastify.register(require('@fastify/swagger'), {
  routePrefix: '/api/api-docs',
  swagger: swaggerDefinition,
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest(request, reply, next) { next(); },
    preHandler(request, reply, next) { next(); }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true
});

/** Importing database connection when server starts */
require('./src/config/dbConfig');

/** Declare routes */
fastify.register(require('./src/routes'), { prefix: '/api' });

/** 404 Handler */
// eslint-disable-next-line no-unused-vars
fastify.setNotFoundHandler((request, reply) => reply.code(404).send(response('Route not found!')));

/** Run the server */
(async () => {
  try {
    await fastify.listen(process.env.APP_PORT || 80, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
