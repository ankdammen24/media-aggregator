import { prisma } from '../../plugins/prisma.js';
import { redisConnection } from '../../plugins/queues.js';
import { checkRadioCoreConnectivity } from '../../clients/radioCoreClient.js';
import { env } from '../../config/env.js';
export const healthRoutes = async (app) => {
    app.get('/health', async () => {
        const postgres = await prisma.$queryRaw `SELECT 1`
            .then(() => true)
            .catch(() => false);
        const redis = await redisConnection.ping().then((r) => r === 'PONG').catch(() => false);
        const radioCore = await checkRadioCoreConnectivity();
        const storage = env.STORAGE_HEALTHCHECK_URL
            ? await fetch(env.STORAGE_HEALTHCHECK_URL).then((r) => r.ok).catch(() => false)
            : true;
        return {
            status: postgres && redis && radioCore && storage ? 'ok' : 'degraded',
            checks: { postgres, redis, radioCore, storage }
        };
    });
};
//# sourceMappingURL=routes.js.map