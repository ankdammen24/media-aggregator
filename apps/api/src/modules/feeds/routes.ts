import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../plugins/prisma.js';

export const feedRoutes: FastifyPluginAsync = async (app) => {
  app.get('/feeds', async () => prisma.feed.findMany({ take: 100, orderBy: { createdAt: 'desc' } }));

  app.post('/feeds', async (request, reply) => {
    const body = request.body as {
      stationId: string;
      name: string;
      url: string;
      type: 'RSS_NEWS' | 'PODCAST';
    };
    const feed = await prisma.feed.create({ data: body });
    reply.code(201);
    return feed;
  });
};
