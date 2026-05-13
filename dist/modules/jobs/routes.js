import { prisma } from '../../plugins/prisma.js';
import { queues } from '../../plugins/queues.js';
export const jobRoutes = async (app) => {
    app.get('/jobs', async () => prisma.ingestJob.findMany({ take: 100, orderBy: { createdAt: 'desc' } }));
    app.post('/jobs/rss-sync', async (request, reply) => {
        const payload = request.body ?? {};
        const job = await queues.rssIngest.add('rss_sync', payload);
        await prisma.ingestJob.create({ data: { type: 'rss_sync', status: 'PENDING', payload: payload } });
        reply.code(202);
        return { queued: true, queueJobId: job.id };
    });
    app.post('/jobs/podcast-sync', async (request, reply) => {
        const payload = request.body ?? {};
        const job = await queues.podcastIngest.add('podcast_sync', payload);
        await prisma.ingestJob.create({ data: { type: 'podcast_sync', status: 'PENDING', payload: payload } });
        reply.code(202);
        return { queued: true, queueJobId: job.id };
    });
};
//# sourceMappingURL=routes.js.map