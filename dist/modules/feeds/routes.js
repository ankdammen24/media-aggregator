import { prisma } from '../../plugins/prisma.js';
export const feedRoutes = async (app) => {
    app.get('/feeds', async () => prisma.feed.findMany({ take: 100, orderBy: { createdAt: 'desc' } }));
    app.post('/feeds', async (request, reply) => {
        const body = request.body;
        const feed = await prisma.feed.create({ data: body });
        reply.code(201);
        return feed;
    });
};
//# sourceMappingURL=routes.js.map