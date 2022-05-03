const { StatusCodes } = require('http-status-codes');

const { response } = require('../helpers/utils');

// eslint-disable-next-line no-unused-vars
module.exports = async (fastify, options) => {
  fastify.get('/healthz', (request, reply) => reply.send(response(null, true, { status: 'OK' })));

  fastify.setNotFoundHandler((request, reply) => reply.code(StatusCodes.NOT_FOUND).send(response('Route not found!')));
};
